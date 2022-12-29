import React, { PureComponent } from "react";
import styles from "./CartItem.module.css";

interface AttributeItemProps {
  id: string;
  type: string;
  items: {
    id: string;
    value: string;
  }[];
  chosenAttribute: string;
}

type State = {};

class AttributeItem extends PureComponent<AttributeItemProps, State> {
  state = {
    showedPicture: 0,
  };
  async componentDidMount() {}

  render() {
    const attribute = this.props;
    return (
      <div className="attributeContainer">
        <div className={styles.attributeName}>{attribute.id}:</div>
        <div className={styles.buttonsContainer}>
          {attribute.items.map((item, index) => {
            return attribute.type === "swatch" ? (
              <div
                key={index}
                className={styles.swatchButtonBorder}
                style={
                  attribute.chosenAttribute === item.id
                    ? { border: "2px solid #5ECE7B" }
                    : {}
                }
              >
                <div
                  key={index}
                  className={styles.swatchButton}
                  style={{
                    backgroundColor: item.value,
                  }}
                />
              </div>
            ) : (
              <div
                key={index}
                className={styles.attributeButton}
                style={
                  attribute.chosenAttribute === item.id
                    ? {
                        backgroundColor: "black",
                        color: "white",
                      }
                    : {}
                }
              >
                {item.value}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AttributeItem;
