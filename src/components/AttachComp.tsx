import React, {useState, Fragment} from 'react';
import {Typography, Box, AppBar, Toolbar, TableSortLabel, Tabs, Tab, IconButton, Popover, MenuItem} from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PreviewIcon from '@mui/icons-material/Preview';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './AttachComp.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface AttachProps {
  attachment : any;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AttachComp = ({attachment}: AttachProps) => {
  console.log(attachment);
  const [value, setValue] = useState(0);
  const [inputText, setInputText] = useState("");
  const [label, setLabel] = React.useState('all');
  const [content, setContent] = React.useState('all');
  const [labelView, setLabelView] = React.useState('list');
  const [contentView, setContentView] = React.useState('list');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [view, setView] = React.useState('1');
  console.log(contentView);

  const handleChangeView = (event: SelectChangeEvent) => {
    setView(event.target.value as string);
  };

  const filteredData = attachment.files.filter((el: any) => {
    //if no input the return the original
    if (inputText === '') {
      return el;
    }
    //return the item which contains the user input
    else {
      return `${el.fileName}`.includes(inputText);
    }
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let inputHandler = (e : any) => {
    let lowerCase = e.target.value;
    setInputText(lowerCase);
  };

  const extensions = [
    {extension: 'jpg', label:'Images', icon: <ImageIcon />, color: '#fcc419'},
    {extension: 'pdf', label:'PDF', icon: <PictureAsPdfIcon />, color: '#f03e3e'},
    {extension: 'docx', label:'Doc', icon: <ArticleIcon />, color: '#339af0'},
    {extension: 'ppt', label:'Ppt', icon: <InsertDriveFileIcon />, color: '#f76707'},
    {extension: 'xlsx', label:'Xls', icon: <InsertDriveFileIcon />, color: '#2f9e44'},
    {extension: 'mp4', label:'Video', icon: <VideoFileIcon />, color: '#4263eb'},
    {extension: 'mp3', label:'Audio', icon: <AudioFileIcon />, color: '#c92a2a'},
  ];

  let extensionsList:any[] = [];
  for(let i = 0; i < attachment.files.length; i++){
    for(let j = 0; j < extensions.length; j++){
      if(attachment.files[i].extension === extensions[j].extension){
        extensionsList.push(extensions[j]);
      }
    }
  }
  console.log(extensionsList);
  let extensionsList2 = extensionsList.filter((tag, index, array) => array.findIndex(t => t.extension === tag.extension) === index);
  console.log(extensionsList2);

  const iconColorGenerator = (ext: string, type: string) => {
    for(let i=0; i<extensionsList.length;i++){
      if(extensionsList[i].extension === ext && type === 'icon'){
        return extensionsList[i].icon;
      }
      else if(extensionsList[i].extension === ext && type === 'color'){
        return extensionsList[i].color;
      }
    }
  };

  const filteredFiles = (ext: string) => {
    return filteredData.filter((tag: any) => tag.extension === ext);
  };
  
  // Dropdown Menu
  const filteredFilesMenu = (cont: string) => {
    if(cont === 'all'){
      return filteredData;
    }
    else{
      console.log(filteredData.filter((flt: any) => flt.filter === cont));
      return filteredData.filter((flt: any) => flt.filter === cont);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleMenuItemClick = (menuItem: string) => {
    handleClose();
    setLabel(menuItem);
    setContent(menuItem);
  }

  const open = Boolean(anchorEl);

  // Dropdown Image View
  const handleMenuItemView = (menuItem: string) => {
    setLabelView(menuItem);
    setContentView(menuItem);
  }

  return (
    <Fragment>
      <AppBar position="fixed" sx={{ zIndex: (theme:any) => theme.zIndex.drawer + 1 }}>
        <Toolbar className='nav' sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" noWrap component="div">
            Attachments
          </Typography>
          <TextField
            sx={{ input: { color: '#fff' } }}
            id="outlined-basic"
            placeholder="Search..."
            type="text"
            variant="standard"
            size="small"
            onChange={inputHandler}
            value={inputText}
            InputProps={{
              startAdornment: (
                <InputAdornment sx={{color: '#fff'}} position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: inputText && (
                <IconButton
                  sx={{color: '#fff'}}
                  aria-label="toggle password visibility"
                  onClick={() => setInputText("")}
                ><ClearIcon/></IconButton>
              )
            }}
          />
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%', marginTop: '4rem' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
            <Tab
              sx={{color: '#862e9c'}}
              label={label}
              icon={<ReorderIcon onClick={handleClick} />}
              iconPosition = 'start'
              onClick={() => setContent(label)}
            />
            {contentView === 'list' && extensionsList2.map((extList: any, i:number) => <Tab key={extList.extension} sx={{color: extList.color}} icon={extList.icon} iconPosition = 'start' label={extList.label} {...a11yProps(i)} />)}
            {contentView === 'tiles' && <Tab sx={{color: '#fcc419'}} icon={<ImageIcon />} iconPosition = 'start' label='Images' {...a11yProps(1)} />}
            
            <Box sx={{ maxWidth: 140, marginTop: 2, marginRight: 2}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">View</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={view}
                  label={labelView}
                  onChange={handleChangeView}
                >
                <MenuItem value={1} onClick={() => handleMenuItemView("list")}>List view</MenuItem>
                <MenuItem value={2} onClick={() => handleMenuItemView("tiles")}>Tiles view</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {contentView === 'list' && <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>FileName</TableCell>
                  <TableCell align="right">Sent By</TableCell>
                  <TableCell align="right"><TableSortLabel onClick={() => {}}>Received Date</TableSortLabel></TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Preview</TableCell>
                  <TableCell align="right">Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFilesMenu(content).map((attach: any) => (
                  <TableRow
                    key={attach.key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <IconButton sx={{color : iconColorGenerator(attach.extension, 'color')}} aria-label="delete">
                        {iconColorGenerator(attach.extension, 'icon')}
                      </IconButton>
                      {attach.fileName}
                    </TableCell>
                    <TableCell align="right">{attach.from ? attach.from : 'By me'}</TableCell>
                    <TableCell align="right">{`${new Date(attach.modifiedDate).toDateString()} ${new Date(attach.modifiedDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}</TableCell>
                    <TableCell align="right">{`${String(attach.size).slice(0, 3)} KB`}</TableCell>
                    <TableCell align="right">
                      <IconButton color='primary' aria-label="preview" href={attach.url} target="_blank">
                        <PreviewIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color='success' aria-label="download" href={attach.url} target="_blank" download={attach.url}>
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>}
          <Box sx={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2 }}>
          {contentView === 'tiles' && filteredFilesMenu(content).map((attach: any) => (attach.extension === 'jpg' && <Card key={attach.key} sx={{ maxWidth: 345}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={attach.extension === 'jpg' ? attach.url : 'none'}
                  alt={attach.fileName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {attach.fileName}
                  </Typography>
                  <div className='secondary'>
                    <Typography variant="body2" color="text.secondary">
                      {`${new Date(attach.modifiedDate).toDateString()} ${new Date(attach.modifiedDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${String(attach.size).slice(0, 3)} KB`}
                    </Typography>
                  </div>
                  <div className='secondary'>
                    <Typography sx={{marginTop: 2}} variant="body2" color="text.secondary">
                      - {attach.from ? attach.from : 'By me'}
                    </Typography>
                    <IconButton className="hidden-button" color='success' aria-label="download" href={attach.url} target="_blank" download={attach.url}>
                      <DownloadIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
            ))}
          </Box>
        </TabPanel>
        {extensionsList2.map((extList: any, i:number) => <TabPanel key={extList.label} value={value} index={++i}>
          {contentView === 'list' && <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>FileName</TableCell>
                    <TableCell align="right">Sent By</TableCell>
                    <TableCell align="right">Received Date</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Preview</TableCell>
                    <TableCell align="right">Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFiles(extList.extension).map((attach: any) => (
                    <TableRow
                      key={attach.key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <IconButton sx={{color : iconColorGenerator(attach.extension, 'color')}} aria-label="delete">
                          {iconColorGenerator(attach.extension, 'icon')}
                        </IconButton>
                        {attach.fileName}
                      </TableCell>
                      <TableCell align="right">{attach.from ? attach.from : 'By me'}</TableCell>
                      <TableCell align="right">{`${new Date(attach.modifiedDate).toDateString()} ${new Date(attach.modifiedDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}</TableCell>
                      <TableCell align="right">{`${String(attach.size).slice(0, 3)} KB`}</TableCell>
                      <TableCell align="right">
                        <IconButton color='primary' aria-label="preview" href={attach.url} target="_blank">
                          <PreviewIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color='success' aria-label="download" href={attach.url} target="_blank" download={attach.url}>
                          <DownloadIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>}
          <Box sx={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2 }}>
          {contentView === 'tiles' && extList.extension === 'jpg' && filteredFiles(extList.extension).map((attach: any) => (attach.extension === 'jpg' && <Card key={attach.key} sx={{ maxWidth: 345}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={attach.extension === 'jpg' ? attach.url : 'none'}
                  alt={attach.fileName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {attach.fileName}
                  </Typography>
                  <div className='secondary'>
                    <Typography variant="body2" color="text.secondary">
                      {`${new Date(attach.modifiedDate).toDateString()} ${new Date(attach.modifiedDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${String(attach.size).slice(0, 3)} KB`}
                    </Typography>
                  </div>
                  <div className='secondary'>
                    <Typography sx={{marginTop: 2}} variant="body2" color="text.secondary">
                      - {attach.from ? attach.from : 'By me'}
                    </Typography>
                    <IconButton className="hidden-button" color='success' aria-label="download" href={attach.url} target="_blank" download={attach.url}>
                      <DownloadIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
            ))}
          </Box>
        </TabPanel>
        )}
      </Box>
      <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick("all")}>
            All
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("sent")}>
            Sent
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("received")}>
            Received
          </MenuItem>
        </Popover>
    </Fragment>
  );
}

export default AttachComp;
