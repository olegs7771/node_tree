import NodeTableRows from './NodeTableRows';
import NodeTableForm from './NodeTableForm';
import NodeDownLoad from './NodeDownLoad';
import axios from 'axios';
import { useState, useEffect } from 'react';

const NodeTree = () => {
  //State
  const [nodes, setNodes] = useState([]);
  const [error, setError] = useState(null);

  // Function fetches all nodes
  const getNodes = async () => {
    try {
      const { data } = await axios.get('/node_tree');
      console.log('data', data);
      setNodes(data);
    } catch (error) {
      console.log('errors', error.response.data);
    }
  };

  //Initiat on reload
  useEffect(() => {
    getNodes();
  }, []);

  //Reload Nodes after editing in child NodeTableRows
  const _reloadNodes = () => {
    console.log('reloaded');
    getNodes();
  };

  //Set Error from child
  const _error = (error) => {
    console.log('error in parent', error);
    setError(error);
  };

  return (
    <div className="nodetree">
      <div className="nodetree__container">
        <div className="nodetree__container__title">
          <h2 className="nodetree__container__title--text">Nodes Table</h2>
        </div>

        <div className="nodetree__container__table">
          <div className="nodetree__container__table__error">
            {error && (
              <div className="nodetree__container__table__error__block">
                <div className="nodetree__container__table__error__block--error">
                  {error.error}
                </div>
              </div>
            )}
          </div>
          <div className="nodetree__container__table__block">
            <table className="table nodetree__container__table__main">
              <thead>
                <tr>
                  <th>id</th>

                  <th>
                    <div className="nodetree__container__table__row">name</div>
                  </th>

                  <th>description</th>
                  <th>parent</th>
                  <th>read_only</th>
                  <th>options</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node, index) => (
                  <NodeTableRows
                    node={node}
                    key={index}
                    reloadNodes={_reloadNodes}
                    sentError={_error}
                  />
                ))}
              </tbody>
            </table>
            <div className="nodetree__container__table__form">
              <NodeTableForm reloadNodes={_reloadNodes} sentError={_error} />
              <br />
              <NodeDownLoad />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeTree;
