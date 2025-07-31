import Button from "@/components/ui/Button";
import { Comment } from "@/utils/types";

export default function CommentItem({ users, content }: Comment) {
  console.log(users, content);
  return (
    <div className="flex items-center gap-3 border-b-2 border-gray-300 w-full pb-2">
      <img src={users.image} alt="" className="rounded-full w-12" />
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0">
            <h5 className="font-semibold">{users.name}</h5>
            <p className="font-semibold text-sm">@{users.username}</p>
          </div>
          <Button type="secondary">Reply</Button>
        </div>
        <h6>{content}</h6>
      </div>
    </div>
  );
}
