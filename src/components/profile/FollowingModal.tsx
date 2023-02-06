import { Modal } from "flowbite-react";
import ModalItem from "./ModalItem";
import { Dispatch, SetStateAction } from "react";

interface FollowingModalProps {
  toggleModal: boolean;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}

const FollowingModal = ({
  toggleModal,
  setToggleModal,
}: FollowingModalProps) => {
  return (
    <Modal
      dismissible={true}
      show={toggleModal}
      onClose={() => setToggleModal(false)}
    >
      <Modal.Header className="border-0 border-b-2 border-solid border-gray-300">
        Daniel Jensen is following
      </Modal.Header>

      <ul className="styledScrollbar max-h-[548px] px-5">
        <ModalItem />
        <ModalItem />
        <ModalItem />
        <ModalItem />
        <ModalItem />
        <ModalItem />
      </ul>
    </Modal>
  );
};

export default FollowingModal;
