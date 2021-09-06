import { useState, useEffect } from 'react';
import axios from 'axios';

const NodeTableForm = ({ reloadNodes, sentError }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parent, setParent] = useState('');
  const [read_only, setRead_only] = useState('');

  const _submit = async (e) => {
    e.preventDefault();
    const data = {
      id,
      name,
      description,
      parent,
      read_only,
    };
    console.log('on submit data', data);
    try {
      const res = await axios.post('/api/v1/nodes/node_tree', data);
      console.log('res.data', res.data);
      reloadNodes();
      sentError(null);
    } catch (error) {
      console.log('errors', error.response.data);
      sentError(error.response.data);
    }
  };

  return (
    <form onSubmit={_submit}>
      <div className="form-group">
        <label>Id</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Id Of Upper Node"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Parent</label>
        <input
          type="text"
          className="form-control"
          placeholder="number"
          name="parent"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Read_Only</label>
        <input
          type="text"
          className="form-control"
          placeholder="0 or 1"
          name="read_only"
          value={read_only}
          onChange={(e) => setRead_only(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default NodeTableForm;
