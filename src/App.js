import { useState } from "react";
import "./App.css";
import { Button, Input, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, FileDoneOutlined  } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [task, setTask] = useState();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      task: "Lau Nhà",
    },
    {
      id: 2,
      task: "Quét Nhà",

    },
    {
      id: 3,
      task: "Rửa Chén",

    },
    {
      id: 4,
      task: "Nấu cơm",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "task",
      dataIndex: "task",
    },
    {
      key: "3",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => onEditEmployee(record)} />
            <DeleteOutlined
              onClick={() => onDeleteEmployee(record)}
              classtask="delete"
            />
            <FileDoneOutlined onClick={() => onMaskDone(record)}/>
          </>
        );
      },
    },
  ];
  const onAddTask = () => {
    const length = dataSource.length + 1;
    const newEmployee = {
      id: length,
      task: task,
    };

    setTask("");

    setDataSource((pre) => {
      return [...pre, newEmployee];
    });
  };
  const onDeleteEmployee = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete item record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((employee) => employee.id !== record.id);
        });
      },
    });
  };
  const onEditEmployee = (record) => {
    setIsEditing(true);
    setEditingEmployee({ ...record });
  };
  const onMaskDone = (record) => {
    setToggle(true);
    ;
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEmployee(null);
  };
  return (
    <div classtask="App">
      <header classtask="App-header">
        <div classtask="Add">
          <Input
            placeholder="task"
            value={task}
            classtask="input"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />{" "}
          <Button type="primary" onClick={onAddTask}>
            Add new
          </Button>
        </div>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Employee"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((employee) => {
                if (employee.id === editingEmployee.id) {
                  return editingEmployee;
                } else {
                  return employee;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingEmployee?.task}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, task: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
