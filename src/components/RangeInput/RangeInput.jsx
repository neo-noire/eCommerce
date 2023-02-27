import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Input from '@material-ui/core/Input';
import s from './RangeInput.module.css'

export const RangeInput = ({ value, setValue }) => {
    // const [value, setValue] = useState([0, 100])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };
    return (
        <Box sx={{ width: 200 }}>
            <div className={s.inputs}>
                <div className={s.min}>Min price:
                    <Input
                        value={value[0]}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </div>
                <div className={s.max}>
                    Max Price:
                    <Input
                        value={value[1]}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </div>
            </div>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </Box>

    )
}
