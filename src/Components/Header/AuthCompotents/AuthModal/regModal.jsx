
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { getRegistrationUser } from '../../../../API/AuthApi';
import { Typography } from '@mui/material';



const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);

    const onSubmit = useCallback((data) => {
        getRegistrationUser({ ...data, group: "group-10" })
    }, []);

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <>
            <Button sx={{ mr: "20px" }} variant="outlined" onClick={handleClick}>
                Регистрация
            </Button>
            <Dialog open={open} onClose={handleClick}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle sx={{ textAlign: 'center' }}>Регистрация</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="mail"
                            label="Почта"
                            type="email"
                            fullWidth
                            variant="outlined"
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Обязатель поле для ввода'
                                },
                                pattern: {
                                    message: 'Email в формате expamle@example.com',
                                    value: /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                }
                            })}
                        />
                        {errors?.email && <span style={{ color: "red" }}>{errors.email?.message}</span>}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="pass"
                            label="Пароль"
                            type="password"
                            fullWidth
                            variant="outlined"
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Обязатель поле для ввода'
                                },
                                pattern: {
                                    message: 'Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру',
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                }
                            })}
                        />
                        {errors?.password && <span style={{ color: "red" }}>{errors.password?.message}</span>}
                        <Typography>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Подтвердить</Button>
                        <Button onClick={handleClick}>Отмена</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    );
}
export default RegistrationForm;