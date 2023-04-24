import React, {useEffect, useState} from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch} from "../../../app/store/store";
import useDebounce from "../../../hooks/useDebounce";
import CustomerThunkService from "../features/customerThunk.service";

type Inputs = {
    search: string;
}
const CustomerSearch = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState<string>('');
    const [skipFirstRender, setSkipFirstRender] = useState<boolean>(false);
    const debounceValue = useDebounce(search, 1000);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        if (skipFirstRender) {
            dispatch(CustomerThunkService.getCustomers({pin_like : debounceValue}));
        }
        setSkipFirstRender(true);
    }, [debounceValue]);

    return (
        <>
            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">FİN</InputLabel>
                <OutlinedInput
                    onChange={handleSearch}
                    value={search}
                    id="outlined-adornment-password"
                    type={"text"}
                    sx={{width: '50ch'}}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <SearchIcon/>
                            </IconButton>
                        </InputAdornment>}
                    label="FİN"
                />
            </FormControl>
        </>
    );
};

export default CustomerSearch;
