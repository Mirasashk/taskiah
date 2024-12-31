import { FaHome } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { IoMdCodeWorking } from 'react-icons/io';
import { FiInbox, FiCalendar, FiStar, FiTag, FiList } from 'react-icons/fi';
import { MdFormatListBulleted } from 'react-icons/md';

// import 20 icons from react-icons

export const Icons = ({ icon }) => {
	const icons = {
		home: <FaHome />,
		code: <IoMdCodeWorking />,
		work: <IoHomeOutline />,
		inbox: <FiInbox />,
		calendar: <FiCalendar />,
		star: <FiStar />,
		tag: <FiTag />,
		list: <MdFormatListBulleted />,
	};

	return icons[icon];
};
