import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Tab, Tabs, TextField, createMuiTheme ,ThemeProvider  } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: '#fff',
            },
        }
    });

    const fetchSearch = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY }&language=en-US&query=${searchText}&page=${page}&include_adult=false`);

        setContent(data.results);
        setNumOfPages(data.total_pages)
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display: "flex", margin: "15px 0"}}>
                    <TextField 
                        style={{flex: 1}}
                        className="searchbox"
                        label="Search..."
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant="contained" style={{marginLeft: 10}} onClick={fetchSearch} >
                        <SearchIcon />
                    </Button>
                </div>
                <div style={{width: '100%', margin:'5px 0 35px 0'}}>
                    <Tabs 
                        value={type} 
                        indicatorColor='primary'
                        textColor='primary'
                        onChange={(event, newValue) => {
                            setType(newValue);
                            setPage(1)
                        }}    
                    >
                        <Tab style={{width: "50%"}} label="Search Movie" />
                        <Tab style={{width: "50%"}} label="Search TV Series" />
                    </Tabs>
                </div>
                
            </ThemeProvider>
            <div className="trending">
                {content && content.map((c) => (
                    <SingleContent 
                        key={c.id} 
                        id={c.id} 
                        media_type={type ? "tv" : "movie"}
                        date={c.release_date || c.first_air_date}
                        title={c.title || c.name}
                        poster={c.poster_path}
                        vote_average={c.vote_average} />
                ))}
                {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPage={numOfPages} /> 
            )}
        </div>
        // eslint-disable-next-line
    )
}

export default Search;  