import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
} from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TaskCalendar = ({ tasks }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd,
    });

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const previousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const getTasksForDate = (date) => {
        return tasks.filter((task) => {
            // Check if dueDate exists and is valid
            if (!task.dueDate) return false;

            try {
                const taskDate = new Date(task.dueDate);
                // Check if taskDate is valid
                if (isNaN(taskDate.getTime())) return false;

                return (
                    format(taskDate, 'yyyy-MM-dd') ===
                    format(date, 'yyyy-MM-dd')
                );
            } catch (error) {
                console.warn('Invalid date found:', task.dueDate);
                return false;
            }
        });
    };

    return (
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
            <div className='flex items-center justify-between mb-4'>
                <button
                    onClick={previousMonth}
                    className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
                >
                    <FiChevronLeft className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                </button>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {format(currentDate, 'MMMM yyyy')}
                </h3>
                <button
                    onClick={nextMonth}
                    className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full'
                >
                    <FiChevronRight className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                </button>
            </div>
            <div className='grid grid-cols-7 gap-1'>
                {[
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                ].map((day) => (
                    <div
                        key={day}
                        className='text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2'
                    >
                        {day}
                    </div>
                ))}
                {days.map((day) => {
                    const dayTasks = getTasksForDate(day);
                    const isToday =
                        format(new Date(), 'yyyy-MM-dd') ===
                        format(day, 'yyyy-MM-dd');
                    const isCurrentMonth =
                        format(day, 'M') === format(currentDate, 'M');

                    return (
                        <div
                            key={day.toString()}
                            className={`p-2 text-center h-20 border border-gray-100 dark:border-gray-700 ${
                                isToday
                                    ? 'bg-blue-50 dark:bg-blue-900/20'
                                    : ''
                            }`}
                        >
                            <span
                                className={`text-sm ${
                                    isToday
                                        ? 'font-bold text-blue-600 dark:text-blue-400'
                                        : isCurrentMonth
                                        ? 'text-gray-700 dark:text-gray-300'
                                        : 'text-gray-400 dark:text-gray-600'
                                }`}
                            >
                                {format(day, 'd')}
                            </span>
                            {dayTasks.length > 0 && (
                                <div className='mt-1'>
                                    <span className='inline-block w-2 h-2 bg-red-500 rounded-full'></span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskCalendar;
