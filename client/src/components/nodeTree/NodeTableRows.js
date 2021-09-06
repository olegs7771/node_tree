import { useState } from 'react';
import axios from 'axios';

const NodeTableRows = ({ node, reloadNodes, sentError }) => {
  // Delete Node Function
  const _deleteNode = async (id) => {
    const data = { id };
    console.log('id', id);
    console.log('data', data);
    try {
      await axios.delete('/node_tree', { data });
      sentError(null);
    } catch (error) {
      console.log('error', error.response.data);
      sentError(error.response.data);
    }
  };

  // Update Name of Node Function

  const _update = async (id, name) => {
    const data = {
      id,
      name,
    };
    console.log('data', data);
    try {
      await axios.put('/node_tree', data);
      reloadNodes();
      setEdit(false);
    } catch (error) {
      console.log('error', error.response.data);
      sentError(error.response.data);
    }
  };

  //   State
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');

  const _delete = async (id) => {
    //Clear Error before  delete anoter node
    sentError(null);
    await _deleteNode(id);
    reloadNodes();
  };

  const _edit = () => {
    setEdit(!edit);
  };

  if (edit) {
    return (
      <tr>
        <td>{node.id}</td>
        <td>
          <div className="nodetree__container__table__row">
            <input
              type="text"
              className="nodetree__container__table__row--field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
        </td>
        <td>{node.description}</td>
        <td>{node.parent}</td>
        <td>{node.read_only}</td>
        <td>
          <div className="btn-group">
            <button
              className="btn btn-primary btn-lg"
              onClick={_update.bind(this, node.id, name)}
            >
              save
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => setEdit(false)}
            >
              cancel
            </button>
          </div>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{node.id}</td>
        <td>
          <div className="nodetree__container__table__row">{node.name}</div>
        </td>
        <td>{node.description}</td>
        <td>{node.parent}</td>
        <td>{node.read_only}</td>
        <td>
          <div className="btn-group">
            <button className="btn btn-primary btn-lg" onClick={_edit}>
              edit
            </button>
            <button
              className="btn btn-warning btn-lg"
              onClick={_delete.bind(this, node.id)}
            >
              delete
            </button>
          </div>
        </td>
      </tr>
    );
  }
};

export default NodeTableRows;
