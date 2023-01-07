import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.notifications.message)
    const className = useSelector(state => state.notifications.className)

    if (message !== null) {
      return (
          <div className={className}>{message}</div>
      )
    }
  };

export default Notification