import {NotificationManager} from "react-notifications";

const Notifications = {
    createNotification: function (type, message, timeOut) {
      
        if (message && message !== 'cancel') {
			switch (type.toString()[1]) {
				//success
				case '1':
					//NotificationManager.success(message, title, timeOut, callback, priority);
					//success('Success message', 'Title here');
                    return NotificationManager.success(message, 'Success');
					break;
				//error
				case '2':
					//error('Error message', 'Click me!', 5000, () => { alert('callback'); })
                    return NotificationManager.error(message, 'Error');
					break;
				//warning
				case '3':
					//warning('Warning message', 'Close after 3000ms', 3000)
                    return NotificationManager.warning(message, 'Warning');
					break;
				//info
				case '4':
					//info('Info message');
                    return NotificationManager.info(message, 'Info', timeOut);
					break;
			}
        }
    }
};

export default Notifications;