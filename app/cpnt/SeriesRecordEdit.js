import Box from '@mui/material/Box';
import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import ppplog from "ppplog";
import { v4 as uuidv4 } from 'uuid';
import RefreshIcon from '@mui/icons-material/Refresh';
import {MAP_TYPE_FACTORY, DATA_TYPE, getSeriesDataType, SUB_TYPE } from "../util/util";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useActiveSub } from '../store/useActiveSub'; // import the custom hook


export default function SeriesRecordEdit({ seriesRecord, onUpdate: onUpdateFromProps }) {


  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  let dataType = getSeriesDataType(seriesRecord)
  let readyRows = seriesRecord.data

  if (dataType === DATA_TYPE.SERIES_DATA_NUMERIC) {
    readyRows = readyRows.map((el, idx) => ({
      id: idx,
      value: el
    }))
  }

  const onUpdate = (newRows) => {

    if (dataType === DATA_TYPE.SERIES_DATA_NUMERIC) {
      let _newRows = newRows.map(el => Number(el.value))

      if (!_newRows.every(el => typeof el === 'number')) {

        return
      }
      onUpdateFromProps(_newRows)
      return
    }

    if (dataType === DATA_TYPE.SERIES_DATA_OBJECT) {
      onUpdateFromProps(newRows)
      return
    }

    onUpdateFromProps(newRows)
  }


  const [rows, setRows] = React.useState(readyRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

   ;
   ;

  // 动态生成columns
  const columns = React.useMemo(() => {
    if (rows.length > 0) {
      let _columns = [];
      const firstRow = rows[0];


      if (typeof firstRow === 'object') {
        _columns = Object.keys(rows[0]).map((key) => (
          {
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1), // 将字段名的首字母大写作为列名
            editable: key !== 'id', // 如果字段是ID，则不允许编辑
          }))
      }

      return [
        ..._columns,
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<SaveIcon />}
                  label="Save"
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />,
              ];
            }

            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
          },
        },
      ];
    }
    return [];
  }, [rows, rowModesModel]);

  const handleRowUpdate = React.useCallback((params) => {
    ppplog('handleRowUpdate')
    const updatedRows = rows.map((row) => {

      if (row) {
        if (row.id === params.id) {
          return params;
        }
      }

      return row;
    });

    setRows(updatedRows);
    onUpdate(updatedRows); // 更新父组件的数据
  }, [rows, onUpdate]);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };


  const handleSaveClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View },
    }));
  };


  const handleDeleteClick = (id) => () => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    onUpdate(updatedRows); // 更新父组件的数据
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleProcessRowUpdateError = (e) => {
    console.error('handleProcessRowUpdateError: ', e);
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, onUpdate },
        }}
      />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error: Unable to convert value to number.
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}


function EditToolbar(props) {
  const { setRows, setRowModesModel, onUpdate } = props;

  const { activeSub } = useActiveSub();

  const handleClick = () => {
    const id = Date.now(); // 使用当前时间戳作为唯一ID
    setRows((oldRows) => {

      if (oldRows.length === 0) {
        if (activeSub?.type === SUB_TYPE.PIE_CHART) {
          const firstRow = {...MAP_TYPE_FACTORY[activeSub.type]().sub.series[0].data[0], id}
          return [firstRow]
        }

        if (activeSub?.type === SUB_TYPE.BAR_CHART) {
          return [{ id, value: 123 }]
        }

        return []
      }

      return [...oldRows, { id }]
    });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleRefreshId = () => {
    setRows((oldRows) => {
      const updatedRows = oldRows.map((row, index) => ({ ...row, id: index }));

      onUpdate(updatedRows); // 更新父组件的数据
      return updatedRows;
    })

  };


  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        添加记录
      </Button>
      <Button variant="outlined" color="secondary" startIcon={<RefreshIcon />} onClick={handleRefreshId}>
        刷新ID
      </Button>

    </GridToolbarContainer>
  );
}


