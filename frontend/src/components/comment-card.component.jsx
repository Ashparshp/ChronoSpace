import { useContext, useState } from "react";
import { getDay } from "../common/date";
import { UserContext } from "../App";
import { toast } from "react-hot-toast";
import CommentField from "./comment-field.component";

const CommentCard = ({ index, leftVal, commentData }) => {
  const {
    commented_by: {
      personal_info: { profile_img, fullname, username },
    },
    commentedAt,
    comment,
    _id,
  } = commentData;

  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const [isReplying, setReplying] = useState(false);

  const handleReplyClick = () => {
    if (!access_token) {
      return toast.error("You need to login to reply to a comment");
    }

    setReplying(!isReplying);
  };
  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-6 rounded-md border border-grey">
        <div className="flex gap-3 items-center mb-8">
          <img src={profile_img} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p className="min-w-fit">{getDay(commentedAt)}</p>
        </div>
        <p className="font-gelasio text-xl ml-3">{comment}</p>
        <div className="flex gap-5 items-center mt-">
          <button className="underline" onClick={handleReplyClick}>
            Reply
          </button>

          {isReplying ? (
            <div className="mt-8">
              <CommentField
                action="reply"
                index={index}
                replyingTo={_id}
                setReplying={setReplying}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
