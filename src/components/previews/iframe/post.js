/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from "react";
import PropTypes from "prop-types";
import styles from "./IframePreview.css";
import axios from "axios";

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    document: null,
  };

  state = {
    isLoading: true,
    url: "",
    error: false,
  };

  componentDidMount() {
    axios
      .post(
        "https://yskeo5mgc0.execute-api.us-west-2.amazonaws.com/dev/startSandbox",
        {
          sanity: {
            id: "whno9apx",
            token: "skSybeO0M3NF3RPaS7fpbXzCgvHiaD88OjrZsLeKWP4RSrWWKiy93KV1ijBdS5gEXndyd5nnCpr4upUv5YyGRvMz8HYZmURBiqttkWVl9LBfn5JwoB1fohVX4tTNNtuPEZjDPzodEbr3N8RItx05z9UkbkEj1XsE4evJV9lQGvQDnCenzOOT",
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        this.setState({
          isLoading: false,
          url: response.data.url,
          error: false,
        });
      })
      .catch((e) => {
        console.log("e", e);
        this.setState({
          isLoading: false,
          url: "",
          error: e,
        });
      });
  }

  render() {
    const { isLoading, url, error } = this.state;

    if (error) {
      return <div>Error</div>;
    }

    console.log("error", error);
    console.log("url", url);
    console.log("isLoading", isLoading);
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className={styles.componentWrapper}>
          <div className={styles.iframeContainer}>
            <iframe src={url} frameBorder={"0"} />
          </div>
        </div>
      );
    }
  }
}

export default IframePreview;
