import Box from '@mui/material/Box';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState, useRef } from 'react';
import { ppplog } from "../util/util";
import { useFabricContext } from "../context/FabricContext";
import { MAIN_ID_TO_RENDER_BOX } from "../util/util";
import useGlobalStore from "../store/useGlobal";
import * as fabric from 'fabric'; // v6
import { historyFabricAdd } from "../util/historyFabric";
import { useActiveSub } from "../store/useActiveSub";
import Button from '@mui/material/Button';

export default function FabricCreator({ setOpenImage }) {
  const { fabricCanvas } = useFabricContext();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const { mainScale } = useGlobalStore();
  const mainRef = useRef(null);
  const imageRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const { activeSub, activeBox, activeBoxId, changeById } = useActiveSub();

  useEffect(() => {
    setTimeout(() => {
      mainRef.current = document.querySelector(`#${MAIN_ID_TO_RENDER_BOX}`)
    }, 800);
  }, []);

  useEffect(() => {
    // Fetch the images from the API
    Promise.all([
      fetch('/api/liststatic', { method: 'POST' }).then(res => res.json()),
      fetch('/api/listupload', { method: 'POST' }).then(res => res.json())
    ])
      .then(([staticResponse, uploadResponse]) => {
        if (staticResponse.status === 'success' && uploadResponse.status === 'success') {
          const staticImages = staticResponse.files.map((file) => `/static/${file}`);
          const uploadImages = uploadResponse.files.map((file) => `/upload/${file}`);
          const allImages = [...staticImages, ...uploadImages];
          const images = allImages.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));
          const videos = allImages.filter(file => file.endsWith('.mp4'));
          setImages(images);
          setVideos(videos); // Assuming you have a state for videos
        } else {
          console.error(staticResponse.error, uploadResponse.error);
        }
      });
  }, []);

  const handleOnMouseDown = (event) => {
    // ppplog('handleOnMouseDown');
    setStartX(event.clientX);
    setStartY(event.clientY);
    imageRef.current = event.target;
  };

  const handleOnMouseUp = (event) => {
    // ppplog('handleOnMouseUp');
    const dropX = event.clientX;
    const dropY = event.clientY;

    if (fabricCanvas && mainRef.current) {
      const rect = mainRef.current.getBoundingClientRect();
      const canvasX = (dropX - rect.left) / mainScale;
      const canvasY = (dropY - rect.top) / mainScale;

      ppplog('imageRef.current', imageRef.current);

      const imgFab = new fabric.Image(imageRef.current, {
        left: canvasX,
        top: canvasY,
        selectable: true,
        hasControls: true
      });

      imgFab.scaleToHeight(200);
      imgFab.scaleToWidth(200);

      fabricCanvas.add(imgFab);
      fabricCanvas.setActiveObject(imgFab);
      fabricCanvas.renderAll();

      historyFabricAdd(fabricCanvas);
      handleSave();
    }
  };

  const handleSave = () => {
    const fabricStr = JSON.stringify(fabricCanvas);

    changeById(activeBoxId, {
      sub: {
        ...activeSub,
        data: fabricStr
      }
    });
  };

  useEffect(() => {
    if (!fabricCanvas) { return }
    fabricCanvas.selection = true;

    fabricCanvas.on('mouse:down', function (options) {
      console.log('fabricCanvas was clicked! ', options);

      if (options.target) {
        console.log('an object was clicked! ', options.target.type);
        options.target.set({
          selectable: true,
          hasControls: true
        });
        fabricCanvas.setActiveObject(options.target);
        fabricCanvas.renderAll();
      }

    });
  }, [fabricCanvas]);

  return (
    <Box sx={{
      position: "fixed",
      right: 0,
      top: 0,
      bottom: 0,
      width: "300px",
      borderLeft: "1px solid Red",
      backgroundColor: '#FFFFFF',
      maxHeight: "100vh",
      overflowY: "auto",
    }}>
      <Box>
        <Box>
          <Button onClick={() => setOpenImage(false)}
            variant="contained"
            color="secondary">隐藏</Button>

          <Button onClick={handleSave}>保存</Button>
        </Box>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            图库
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', overflow: "scroll", maxHeight: "60vh" }}>
              {images.map((image) => (
                <Box key={image} sx={{ p: 1, m: 1 }}>
                  <img
                    src={image}
                    width={100}
                    height={70}
                    alt={image}
                    draggable={true}
                    className="object-cover w-full"
                    onMouseDown={handleOnMouseDown}
                    onDragEnd={handleOnMouseUp}
                  />
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Accordion 2
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
