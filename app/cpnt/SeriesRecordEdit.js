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



export default function SeriesRecordEdit({ seriesRecord, onUpdate }) {
  const [rows, setRows] = React.useState(seriesRecord.data);
  const [rowModesModel, setRowModesModel] = React.useState({});

  ppplog('rows', rows);
  ppplog('rowModesModel', rowModesModel);

  // 动态生成columns
  const columns = React.useMemo(() => {
    if (rows.length > 0) {
      return [
        ...Object.keys(rows[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1), // 将字段名的首字母大写作为列名
          editable: key !== 'id', // 如果字段是ID，则不允许编辑
        })),
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
      ppplog('id', row, params)
      if (row) {
        if (row.id === params.id) {
          return params;
        }
      }

      return row;
    });
    ppplog('3updatedRows', updatedRows)
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
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Date.now(); // 使用当前时间戳作为唯一ID
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };


  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        添加记录
      </Button>
    </GridToolbarContainer>
  );
}


