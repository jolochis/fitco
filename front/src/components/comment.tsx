interface CommentProps {
  comment: {
    id: number;
    author: {
      username: string;
    };
    content: string;
  };
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{comment.author.username}</span>
        <p className="text-sm">{comment.content}</p>
      </div>
    </div>
  );
}
