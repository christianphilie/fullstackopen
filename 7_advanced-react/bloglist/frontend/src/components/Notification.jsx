const Notification = ({ notification }) => {
  const { message, isError } = notification

  if (!message) {
    return null
  }

  return (
    <div className="container-main pb-0">
      <div
        className={`text-sm px-4 py-3 rounded-md border mb-2 ${
          isError
            ? 'border-red-200 bg-red-50 text-red-700'
            : 'border-slate-200 bg-slate-50 text-slate-700'
        }`}
      >
        {message}
      </div>
    </div>
  )
}

export default Notification
