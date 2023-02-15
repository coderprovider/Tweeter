import { Alert, Modal } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import CommentBox from "../layout/CommentBox";
import TweetComment from "../layout/TweetComment";

interface FollowingModalProps {
  toggleModal: boolean;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}

const CommentModal = ({ toggleModal, setToggleModal }: FollowingModalProps) => {
  return (
    <Modal
      dismissible={true}
      show={toggleModal}
      size="3xl"
      onClose={() => setToggleModal(false)}
    >
      <Modal.Header className="border-0 border-b-2 border-solid border-gray-300">
        Comments
      </Modal.Header>

      {/* <ul className="styledScrollbar max-h-[548px] px-5"></ul> */}
      <Modal.Body className="styledScrollbar max-h-[600px]">
        <CommentBox />

        {/* <TweetComment />
        <TweetComment /> */}

        <Alert color="info" className="mt-6">
          <span>
            <span className="font-medium">No comments!</span> No comments to
            show!!!.
          </span>
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
