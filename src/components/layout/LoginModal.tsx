import { Button, Modal } from "flowbite-react";
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
      size="md"
      dismissible={true}
      show={toggleModal}
      onClose={() => setToggleModal(false)}
    >
      <Modal.Header className="border-0 border-b-2 border-solid border-gray-300">
        Login to your account
      </Modal.Header>

      <Modal.Body className="styledScrollbar max-h-[548px] space-y-2.5 px-5">
        <Button size="lg" color="failure" className="w-full">
          Google
        </Button>
        <Button size="lg" className="w-full">
          Twitter
        </Button>
        <Button size="lg" color="dark" className="w-full">
          Github
        </Button>
        <Button size="lg" color="purple" className="w-full">
          Discord
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default FollowingModal;
