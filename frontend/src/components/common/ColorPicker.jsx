// Color picker for tags

import { useState, useEffect, useRef } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';

const CustomColorPicker = ({ color, setColor }) => {
    // const [color, setColor] = useColor('#ffff');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const pickerRef = useRef(null);

    const openColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    const handleClickOutside = (event) => {
        if (
            pickerRef.current &&
            !pickerRef.current.contains(event.target)
        ) {
            setShowColorPicker(false);
        }
    };

    useEffect(() => {
        if (showColorPicker) {
            document.addEventListener(
                'mousedown',
                handleClickOutside
            );
        } else {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        }

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, [showColorPicker]);

    const renderColorPicker = () => {
        if (showColorPicker) {
            return (
                <div className='relative' ref={pickerRef}>
                    <div className='absolute top-0 left-0'>
                        <ColorPicker
                            color={color}
                            onChange={setColor}
                        />
                    </div>
                </div>
            );
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <button
                onClick={openColorPicker}
                style={{
                    backgroundColor: color.hex,
                    borderRadius: '50%',
                    color: 'white',
                    padding: '0.5rem',
                    width: '1.5rem',
                    height: '1.5rem',
                }}
            ></button>
            {renderColorPicker()}
        </div>
    );
};

export default CustomColorPicker;
