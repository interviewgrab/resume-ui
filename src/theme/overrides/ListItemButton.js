export default function ListItemButton(theme) {
    return {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    margin: '2px',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.light,
                        boxShadow: 'none',
                    },

                    sx: {
                        height: '48px',
                    },
                },
                sizeLarge: {
                    height: 48,
                },
            },
        },
    }
}
