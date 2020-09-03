import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/crwn-db-cdb78/databases/(default)/documents/collections"
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections));
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
