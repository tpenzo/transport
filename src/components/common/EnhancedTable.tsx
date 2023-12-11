import { alpha } from '@mui/material/styles';
import { Typography, Tooltip, IconButton, Toolbar, Box } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';

interface EnhancedTableProps {
    numSelected: number;
}

export default function EnhancedTable(props: EnhancedTableProps) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Box sx={{ flex: '1 1 100%' }}>
                    <Tooltip title="Làm mới">
                        <RefreshIcon className="cursor-pointer" />
                    </Tooltip>
                </Box>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <FilterListIcon />
            )}
        </Toolbar>
    );
}
