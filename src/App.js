// Packages
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { v4 } from "uuid";
import 'moment-timezone';
 
//  DR: CSS
import "./App.css";


// DR: General Components
import NavBar from "./components/NavBar";
import ResourcePreview from "./components/ResourcePreview";

//  DR: Route Components for other pages
import ShareResourcePage from "./components/routes/ShareResourcePage";
import ResourcePage from "./components/routes/ResourcePage";
import HomePage from "./components/routes/HomePage";

// Mock data
import resources from "./mock/resources";

//  DR: The Entire App
function App() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="header">
            <NavBar />
          </div>
          <div>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/share-resource">
              <ShareResourcePage />
            </Route>
            <Route path="/resource/:hash_key">
              <ResourcePage />
            </Route>
          </div>
        </div>
      </BrowserRouter>
    );
  }



export default App;
















































































// const renderResources = () => {
//   const { resources } = this.state;
//   const allResourceHashes = this.getAllResourceHashes();
//   return allResourceHashes.map((hashKey) =>
//     resources[hashKey] ? (
//       <ResourcePreview
//         {...resources[hashKey]}
//         hashKey={hashKey}
//         key={hashKey}
//       />
//     ) : null
//   );
// };

// const getResourceHash = (object) => Object.keys(object)[0];

// const getAllResourceHashes = (object) => Object.keys(resources);
// // submitResourceForm = resourceForm => this.setState({ ...this.state.resources, resources: { ...this.state.resources, [v4()]: {...resourceForm}  } })

// submitResourceForm = (resourceForm) => {
//   const newResource = { [v4()]: { ...resourceForm } };
//   console.log(12, newResource);
//   this.setState({
//     ...this.state.resources,
//     resources: { ...this.state.resources, ...newResource },
//   });
// };

// findResource = (hashKey) =>
//   this.state.resources[hashKey] ? this.state.resources[hashKey] : false;

// updateResource = (hashKey, updatedResource) => {
//   const { resources } = this.state;
//   const allResourceHashes = this.getAllResourceHashes();
//   if (allResourceHashes.indexOf(hashKey)) {
//     const updatedResources = allResourceHashes.filter((hashKeys) =>
//       hashKeys === hashKey
//         ? { [hashKey]: updatedResource }
//         : { [hashKeys]: resources[hashKeys] }
//     );
//     this.setState({ ...this.state, resources: { ...updatedResources } });
//   } else {
//     return false;
//   }
//   return;
// };