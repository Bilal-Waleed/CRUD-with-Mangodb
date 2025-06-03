import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userModel from './model/user.js';
import methodOverride from 'method-override';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.error("Error rendering index:", error);
        res.redirect('/404');
    }
});

app.get('/read', async (req, res) => {
    try {
        const users = await userModel.find();
        res.render("read", { users }); 
    } catch (error) {
        console.error("Error fetching users:", error);
        res.redirect('/404');
    }
});

app.post('/create', async (req, res) => {
    try {
        const { name, email, image } = req.body;
        const user = new userModel({ name, email, image });
        await user.save();
        res.redirect('/read');
    } catch (error) {
        console.error("Error creating user:", error);
        res.redirect('/404');
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await userModel.findByIdAndDelete(id);
        console.log("Deleted User:", deleteUser);
        res.redirect('/read');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.redirect('/404');
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, image } = req.body;
        const user = await userModel.findOneAndUpdate({ _id: id }, { name, email, image }, { new: true });
        console.log('Updated:', user);
        res.redirect('/read');
    } catch (error) {
        console.error("Error updating user:", error);
        res.redirect('/404');
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) return res.redirect('/404');
        res.render("edit", { user });
    } catch (error) {
        console.error("Error fetching user for edit:", error);
        res.redirect('/404');
    }
});

app.get('/404', (req, res) => {
    res.status(404).render('404');
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
