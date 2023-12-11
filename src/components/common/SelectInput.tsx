'use client';
import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { NextPage } from 'next';
import { Theme, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { showStatusOrder } from '@/utils/FormatData';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, dataSelected: string, theme: Theme) {
    return {
        fontWeight:
            dataSelected === name
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface Props {
    items: Array<string>;
    itemSelected: string;
    setItemSelected: any;
    className?: string;
    multiple?: boolean;
    lableName?: string;
    payment?: string;
    setItem?: any;
}

const SelectInput: NextPage<Props> = ({
    items,
    itemSelected,
    setItemSelected,
    className = '',
    multiple = false,
    lableName = '',
    setItem = () => {},
}) => {
    const theme = useTheme();

    const [dataSelected, setdataSelected] = useState<string>(itemSelected);
    const handleChange = (event: SelectChangeEvent<typeof dataSelected>) => {
        const {
            target: { value },
        } = event;
        setdataSelected(value as string);
        setItemSelected(value as string);
        setItem(value as string);
    };

    return (
        <FormControl className={className} margin="normal">
            <InputLabel id="label">{lableName}</InputLabel>
            <Select
                labelId="label"
                fullWidth
                multiple={multiple}
                displayEmpty
                value={showStatusOrder(dataSelected)}
                onChange={handleChange}
                input={<OutlinedInput label={lableName} />}
                renderValue={(selected) => {
                    if (!selected) {
                        // setItem(items[0] as string);
                        return items[0];
                    }
                    return selected;
                }}
                // size="small"
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} value={item} style={getStyles(item, dataSelected, theme)}>
                        {showStatusOrder(item)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectInput;
