import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Reader.module.css';
import Publication from './Publication/Publication';
import Counter from './Counter/Counter';
import Controls from './Controls/Controls';

class Reader extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  };

  state = {
    indexValue: 1,
    items: this.props.items,
  };

  componentDidMount() {
    if (localStorage.getItem('indexValue')) {
      const index = localStorage.getItem('indexValue');
      this.setState({
        indexValue: JSON.parse(index),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { indexValue } = this.state;
    if (prevState !== this.state) {
      localStorage.setItem('indexValue', JSON.stringify(indexValue));
    }
  }

  hendleDecrement = () => {
    const { indexValue } = this.state;
    if (indexValue > 1) {
      this.setState(state => ({
        indexValue: state.indexValue - 1,
      }));
    }
  };

  hendleIncrement = () => {
    const { indexValue, items } = this.state;
    if (indexValue < items.length) {
      this.setState(state => ({
        indexValue: state.indexValue + 1,
      }));
    }
  };

  render() {
    const { indexValue, items } = this.state;
    const emptyData = items.length === 0;

    return (
      <>
        {!emptyData && (
          <div className={styles.reader}>
            <Publication
              title={items[indexValue - 1].title}
              text={items[indexValue - 1].text}
            />
            <Counter itemsLength={items.length} indexValue={indexValue} />
            <Controls
              className={styles.controls}
              indexValue={indexValue}
              itemsLength={items.length}
              hendleIncrement={this.hendleIncrement}
              hendleDecrement={this.hendleDecrement}
            />
          </div>
        )}
        {emptyData && (
          <div>
            <p>Empty data base</p>
          </div>
        )}
      </>
    );
  }
}

export default Reader;
