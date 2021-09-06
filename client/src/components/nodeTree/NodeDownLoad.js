import axios from 'axios';

const NodeDownLoad = () => {
  const _download = async () => {
    try {
      const { data } = await axios.get('/api/v1/nodes/node_tree_csv');

      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'data_tree.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log('error', error.response.data);
    }
  };

  return (
    <div>
      <button className="btn btn-lg btn-secondary" onClick={_download}>
        Click to Download CSV
      </button>
    </div>
  );
};

export default NodeDownLoad;
