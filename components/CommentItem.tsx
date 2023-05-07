import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import Avatar from "./Avatar";
interface CommentItemProps {
  data: Record<string, any>;
}
const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();
  const goToUser = useCallback(
    (event: any) => {
      event?.stopPropagation();
      router.push(`/users/${data?.user?.id}`);
    },
    [router, data?.user?.id]
  );

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }
    return formatDistanceToNow(new Date(data?.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      className="border-b-[3px]
     p-5
      cursor-pointer
     hover:bg-neutral-900 
    transition"
    >
      <div className="flex items-start gap-3">
        <Avatar userId={data?.user?.id} />
        <div>
          <div onClick={goToUser} className="flex items-center gap-2">
            <p
              className="text-white font-semibold cursor-pointer hover:underline
                "
            >
              {data?.user?.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hidden md:block">
                @{data?.user?.username}

            </span>
            <span className="text-neutral-500 text-sm">
                {createdAt}
            </span>
          </div>
          <div className="text-white mt-1">
            {data?.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
