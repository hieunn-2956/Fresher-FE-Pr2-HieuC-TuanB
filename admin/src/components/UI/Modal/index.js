import "antd/dist/antd.css";
import { Modal } from "antd";

/**
 * @author
 * @function NewModal
 **/

export const NewModal = (props) => {
  return (
    <Modal
      title={props.title}
      centered
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width={1000}
    >
      {props.children}
    </Modal>
  );
};

export default NewModal;
