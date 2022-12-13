type ToastType = "success" | "error" | "warning" | "info"

interface Props {
  type: ToastType,
  message: string
}

export default function Toast({ type, message }: Props) {
  const classname = `alert alert-${type} cursor-pointer`;
  return (
    <div className="toast toast-end">
      <div className={classname}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>

  )
}
