import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from '@mui/material/CardMedia';
import image from './add-image.png'
import { addPost } from '../../../../API/PostsApi';

export const PostAddForm = ({ openDialog, onClose, onClick }) => {

    const [form, setForm] = useState({
        title: '',
        image: '',
        tags: '',
        text: ''
    })

    const handleForm = useCallback((event) => {
        setForm((prev) => ({ ...prev, [event.target.id]: event.target.value }))
    }, [])

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        addPost({ ...form, tags: form.tags.replace(/,. /mig, ',').split(',') })
        setForm({
            title: '',
            image: '',
            tags: '',
            text: ''
        })
    }, [form])

    return (
        <Dialog open={openDialog} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Добавление нового поста</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <CardMedia sx={{
                        objectFit: 'contain',
                        height: '256px'
                    }}
                        component="img"
                        image={image}
                        alt="user avatar"
                    />
                    <TextField
                        margin="dense"
                        id="title"
                        value={form.title}
                        onChange={handleForm}
                        label="Заголовок поста"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="image"
                        value={form.image}
                        onChange={handleForm}
                        label="Ссылка на картинку"
                        placeholder="Введите URL картинки"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="tags"
                        value={form.tags}
                        onChange={handleForm}
                        label="Тэги"
                        type="text"
                        fullWidth
                        variant="outlined"
                        placeholder="Введите тэги через запятую"
                    />
                    <TextField
                        id="text"
                        value={form['outlined-multiline-static']}
                        onChange={handleForm}
                        margin="normal"
                        label="Ваш пост"
                        multiline
                        fullWidth
                        rows={4}
                        placeholder="Текст вашего поста"
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Добавить</Button>
                    <Button onClick={onClick}>Закрыть</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}