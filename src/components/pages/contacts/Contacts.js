import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../spinner/Spinner';
import './contacts.scss';
import img from '../../../resources/img/contacts/contacts_photo.jpg';
import email from './email.svg';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const Contacts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [formStatus, setFormStatus] = useState('idle');

    useEffect(() => {
        const preload = new Image();
        preload.src = img;
        preload.onload = () => setIsLoading(false);
        preload.onerror = () => setIsLoading(false);
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('form-name', 'contact');
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('text', values.text);

        try {
            await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            });

            setFormStatus('success');
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('error');
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Helmet>
                <title>Contacts | Volodymyr Sinusik</title>
                <meta
                    name="description"
                    content="Contact information of Volodymyr Sinusik. Get in touch directly via the contact form or other ways."
                />
                <meta name="author" content="Volodymyr Sinusik" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta
                    name="keywords"
                    content="Volodymyr Sinusik, contacts, contact form, email, phone, get in touch"
                />

                <meta property="og:title" content="Contacts | Volodymyr Sinusik" />
                <meta
                    property="og:description"
                    content="Get in touch with Volodymyr Sinusik via contact form or other methods."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sinusik.com/contacts" />
                <meta
                    property="og:image"
                    content="https://sinusik.com/images/contacts-preview.jpg"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contacts | Volodymyr Sinusik" />
                <meta
                    name="twitter:description"
                    content="Contact information of Volodymyr Sinusik. Write to me via form or other methods."
                />
                <meta
                    name="twitter:image"
                    content="https://sinusik.com/images/contacts-preview.jpg"
                />
            </Helmet>
            <div className='contacts'>
                <div className='container'>
                    <div className='contacts_wrapper'>
                        <div className='contacts_photo'>
                            <img src={img} alt='contacts_photo' />
                        </div>
                        <div className='contacts_info'>
                            <div className='contacts_info_form'>
                                <div className='contacts_info_name'>Volodymyr Sinusik</div>
                                <div className='contacts_info_place'>Cherkasy, Ukraine</div>

                                <div className="contacts_info_links">
                                    <div className="contacts_social">
                                        <a
                                            href="mailto:sinusikvova@gmail.com"
                                            className="contacts_link contacts_link_e"
                                            title="Write a leter"
                                        >
                                            <img src={email} alt="email" />
                                        </a>

                                        <a
                                            href="https://www.instagram.com/sinusik_art/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contacts_link contacts_link_i"
                                            title="My Instagram"
                                        >
                                            <svg
                                                width="25"
                                                height="25"
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M-9.01547e-07 9.375L-4.09794e-07 20.625C-1.83506e-07 25.8019 4.19812 30 9.375 30L20.625 30C25.8019 30 30 25.8019 30 20.625L30 9.375C30 4.19813 25.8019 7.79513e-07 20.625 1.0058e-06L9.375 1.49755e-06C4.19812 1.72384e-06 -1.12784e-06 4.19813 -9.01547e-07 9.375ZM20.625 2.8125C24.2437 2.8125 27.1875 5.75625 27.1875 9.375L27.1875 20.625C27.1875 24.2437 24.2437 27.1875 20.625 27.1875L9.375 27.1875C5.75625 27.1875 2.8125 24.2437 2.8125 20.625L2.8125 9.375C2.8125 5.75625 5.75625 2.8125 9.375 2.8125L20.625 2.8125Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M7.5 15C7.5 19.1419 10.8581 22.5 15 22.5C19.1419 22.5 22.5 19.1419 22.5 15C22.5 10.8581 19.1419 7.5 15 7.5C10.8581 7.5 7.5 10.8581 7.5 15ZM19.6875 15C19.6875 17.5837 17.5837 19.6875 15 19.6875C12.4144 19.6875 10.3125 17.5838 10.3125 15C10.3125 12.4163 12.4144 10.3125 15 10.3125C17.5837 10.3125 19.6875 12.4162 19.6875 15Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M7.93685 6.93715C7.93685 6.38521 7.48942 5.93777 6.93748 5.93777C6.38554 5.93777 5.93811 6.38521 5.93811 6.93715C5.93811 7.48909 6.38554 7.93652 6.93748 7.93652C7.48942 7.93652 7.93685 7.48909 7.93685 6.93715Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <Formik
                                    initialValues={{
                                        name: '',
                                        email: '',
                                        text: ''
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string()
                                            .min(2, 'At least 2 characters')
                                            .required('Required'),
                                        email: Yup.string()
                                            .email('Incorrect email format')
                                            .required('Required'),
                                        text: Yup.string()
                                            .min(10, 'At least 10 characters')
                                    })}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        formStatus === 'success' ? (
                                            <div className="form-success">
                                                ✅ Ваше повідомлення успішно надіслано!
                                            </div>
                                        ) : (
                                            <Form className="form" name="contact">
                                                {/* приховане поле для Netlify (потрібне навіть якщо без редіректу) */}
                                                <input type="hidden" name="form-name" value="contact" />
                                                <input type="hidden" name="bot-field" />

                                                <h2>Inquiry form</h2>

                                                <MyTextInput
                                                    label="Your name"
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="name"
                                                />
                                                <MyTextInput
                                                    label="Your email"
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="off"
                                                    placeholder="email"
                                                />

                                                <label htmlFor="text">Your message</label>
                                                <Field
                                                    id="text"
                                                    name="text"
                                                    as="textarea"
                                                    placeholder="message"
                                                />
                                                <ErrorMessage component="div" className="error" name="text" />

                                                <button type="submit" disabled={isSubmitting}>Send</button>
                                            </Form>
                                        )
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Contacts;













// import { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
// import * as Yup from 'yup';
// import Spinner from '../../spinner/Spinner';
// import './contacts.scss';
// import img from '../../../resources/img/contacts/contacts_photo.jpg';
// import email from './email.svg';

// const MyTextInput = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return (
//         <>
//             <label htmlFor={props.name}>{label}</label>
//             <input {...field} {...props} />
//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ) : null}
//         </>
//     );
// };

// const Contacts = () => {

//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const preload = new Image();
//         preload.src = img;
//         preload.onload = () => setIsLoading(false);
//         preload.onerror = () => {
//             console.error('Image failed to load');
//             setIsLoading(false);
//         };
//     }, []);

//     if (isLoading) {
//         return <Spinner />;
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>Contacts | Volodymyr Sinusik</title>
//                 <meta
//                     name="description"
//                     content="Contact information of Volodymyr Sinusik. Get in touch directly via the contact form or other ways."
//                 />
//                 <meta name="author" content="Volodymyr Sinusik" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />

//                 <meta
//                     name="keywords"
//                     content="Volodymyr Sinusik, contacts, contact form, email, phone, get in touch"
//                 />

//                 <meta property="og:title" content="Contacts | Volodymyr Sinusik" />
//                 <meta
//                     property="og:description"
//                     content="Get in touch with Volodymyr Sinusik via contact form or other methods."
//                 />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://sinusik.com/contacts" />
//                 <meta
//                     property="og:image"
//                     content="https://sinusik.com/images/contacts-preview.jpg"
//                 />

//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="Contacts | Volodymyr Sinusik" />
//                 <meta
//                     name="twitter:description"
//                     content="Contact information of Volodymyr Sinusik. Write to me via form or other methods."
//                 />
//                 <meta
//                     name="twitter:image"
//                     content="https://sinusik.com/images/contacts-preview.jpg"
//                 />
//             </Helmet>
//             <div className='contacts'>
//                 <div className='container'>
//                     <div className='contacts_wrapper'>
//                         <div className='contacts_photo'>
//                             <img src={img} alt='contacts_photo' />
//                         </div>
//                         <div className='contacts_info'>
//                             <div className='contacts_info_form'>
//                                 <div className='contacts_info_name'>Volodymyr Sinusik</div>
//                                 <div className='contacts_info_place'>Cherkasy, Ukraine</div>

//                                 <div className="contacts_info_links">
//                                     <div className="contacts_social">
//                                         <a
//                                             href="mailto:sinusikvova@gmail.com"
//                                             className="contacts_link contacts_link_e"
//                                             title="Write a leter"
//                                         >
//                                             <img src={email} alt="email" />
//                                         </a>

//                                         <a
//                                             href="https://www.instagram.com/sinusik_art/"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="contacts_link contacts_link_i"
//                                             title="My Instagram"
//                                         >
//                                             <svg
//                                                 width="25"
//                                                 height="25"
//                                                 viewBox="0 0 30 30"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path
//                                                     d="M-9.01547e-07 9.375L-4.09794e-07 20.625C-1.83506e-07 25.8019 4.19812 30 9.375 30L20.625 30C25.8019 30 30 25.8019 30 20.625L30 9.375C30 4.19813 25.8019 7.79513e-07 20.625 1.0058e-06L9.375 1.49755e-06C4.19812 1.72384e-06 -1.12784e-06 4.19813 -9.01547e-07 9.375ZM20.625 2.8125C24.2437 2.8125 27.1875 5.75625 27.1875 9.375L27.1875 20.625C27.1875 24.2437 24.2437 27.1875 20.625 27.1875L9.375 27.1875C5.75625 27.1875 2.8125 24.2437 2.8125 20.625L2.8125 9.375C2.8125 5.75625 5.75625 2.8125 9.375 2.8125L20.625 2.8125Z"
//                                                     fill="black"
//                                                 />
//                                                 <path
//                                                     d="M7.5 15C7.5 19.1419 10.8581 22.5 15 22.5C19.1419 22.5 22.5 19.1419 22.5 15C22.5 10.8581 19.1419 7.5 15 7.5C10.8581 7.5 7.5 10.8581 7.5 15ZM19.6875 15C19.6875 17.5837 17.5837 19.6875 15 19.6875C12.4144 19.6875 10.3125 17.5838 10.3125 15C10.3125 12.4163 12.4144 10.3125 15 10.3125C17.5837 10.3125 19.6875 12.4162 19.6875 15Z"
//                                                     fill="black"
//                                                 />
//                                                 <path
//                                                     d="M7.93685 6.93715C7.93685 6.38521 7.48942 5.93777 6.93748 5.93777C6.38554 5.93777 5.93811 6.38521 5.93811 6.93715C5.93811 7.48909 6.38554 7.93652 6.93748 7.93652C7.48942 7.93652 7.93685 7.48909 7.93685 6.93715Z"
//                                                     fill="black"
//                                                 />
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 </div>

//                                 <Formik
//                                     initialValues={{
//                                         name: '',
//                                         email: '',
//                                         text: ''
//                                     }}
//                                     validationSchema={Yup.object({
//                                         name: Yup.string()
//                                             .min(2, 'At least 2 characters')
//                                             .required('Required'),
//                                         email: Yup.string()
//                                             .email('Incorrect email format')
//                                             .required('Required'),
//                                         text: Yup.string()
//                                             .min(10, 'At least 10 characters')
//                                     })}
//                                     onSubmit={(values, { resetForm }) => {
//                                         const formData = new FormData();
//                                         formData.append("form-name", "contact");
//                                         for (const key in values) {
//                                             formData.append(key, values[key]);
//                                         }

//                                         fetch("/", {
//                                             method: "POST",
//                                             body: formData,
//                                         })
//                                             .then(() => {
//                                                 alert("Message sent successfully!");
//                                                 resetForm();
//                                             })
//                                             .catch((error) => {
//                                                 alert("Error sending message.");
//                                                 console.error("Form error:", error);
//                                             });
//                                     }}
//                                 >
//                                     <Form className="form" name="contact"
//                                         method="POST"
//                                         data-netlify="true"
//                                         netlify-honeypot="bot-field" netlify>

//                                         <input type="hidden" name="form-name" value="contact" />
//                                         <input type="hidden" name="bot-field" />

//                                         <h2>Inquiry form</h2>

//                                         <MyTextInput
//                                             label="Your name"
//                                             id="name"
//                                             name="name"
//                                             type="text"
//                                             autoComplete="off"
//                                             placeholder="name"
//                                         />
//                                         <MyTextInput
//                                             label="Your email"
//                                             id="email"
//                                             name="email"
//                                             type="email"
//                                             autoComplete="off"
//                                             placeholder="email"
//                                         />
//                                         <ErrorMessage component="div" className="error" name="currency" />
//                                         <label htmlFor="text">Your message</label>
//                                         <Field
//                                             id="text"
//                                             name="text"
//                                             as="textarea"
//                                             placeholder="message"
//                                         />
//                                         <ErrorMessage component="div" className="error" name="text" />
//                                         <button type="submit">Send</button>
//                                     </Form>
//                                 </Formik>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Contacts;






// import { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
// import * as Yup from 'yup';
// import Spinner from '../../spinner/Spinner';
// import './contacts.scss';
// import img from '../../../resources/img/contacts/contacts_photo.jpg';
// import email from './email.svg';

// const MyTextInput = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return (
//         <>
//             <label htmlFor={props.name}>{label}</label>
//             <input {...field} {...props} />
//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ) : null}
//         </>
//     );
// };

// const Contacts = () => {

//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const preload = new Image();
//         preload.src = img;
//         preload.onload = () => setIsLoading(false);
//         preload.onerror = () => {
//             console.error('Image failed to load');
//             setIsLoading(false);
//         };
//     }, []);

//     if (isLoading) {
//         return <Spinner />;
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>Contacts | Volodymyr Sinusik</title>
//                 <meta
//                     name="description"
//                     content="Contact information of Volodymyr Sinusik. Get in touch directly via the contact form or other ways."
//                 />
//                 <meta name="author" content="Volodymyr Sinusik" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />

//                 <meta
//                     name="keywords"
//                     content="Volodymyr Sinusik, contacts, contact form, email, phone, get in touch"
//                 />

//                 <meta property="og:title" content="Contacts | Volodymyr Sinusik" />
//                 <meta
//                     property="og:description"
//                     content="Get in touch with Volodymyr Sinusik via contact form or other methods."
//                 />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://sinusik.com/contacts" />
//                 <meta
//                     property="og:image"
//                     content="https://sinusik.com/images/contacts-preview.jpg"
//                 />

//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="Contacts | Volodymyr Sinusik" />
//                 <meta
//                     name="twitter:description"
//                     content="Contact information of Volodymyr Sinusik. Write to me via form or other methods."
//                 />
//                 <meta
//                     name="twitter:image"
//                     content="https://sinusik.com/images/contacts-preview.jpg"
//                 />
//             </Helmet>
//             <div className='contacts'>
//                 <div className='container'>
//                     <div className='contacts_wrapper'>
//                         <div className='contacts_photo'>
//                             <img src={img} alt='contacts_photo' />
//                         </div>
//                         <div className='contacts_info'>
//                             <div className='contacts_info_form'>
//                                 <div className='contacts_info_name'>Volodymyr Sinusik</div>
//                                 <div className='contacts_info_place'>Cherkasy, Ukraine</div>

//                                 <div className="contacts_info_links">
//                                     <div className="contacts_social">
//                                         <a
//                                             href="mailto:sinusikvova@gmail.com"
//                                             className="contacts_link contacts_link_e"
//                                             title="Write a leter"
//                                         >
//                                             <img src={email} alt="email" />
//                                         </a>

//                                         <a
//                                             href="https://www.instagram.com/sinusik_art/"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="contacts_link contacts_link_i"
//                                             title="My Instagram"
//                                         >
//                                             <svg
//                                                 width="25"
//                                                 height="25"
//                                                 viewBox="0 0 30 30"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path
//                                                     d="M-9.01547e-07 9.375L-4.09794e-07 20.625C-1.83506e-07 25.8019 4.19812 30 9.375 30L20.625 30C25.8019 30 30 25.8019 30 20.625L30 9.375C30 4.19813 25.8019 7.79513e-07 20.625 1.0058e-06L9.375 1.49755e-06C4.19812 1.72384e-06 -1.12784e-06 4.19813 -9.01547e-07 9.375ZM20.625 2.8125C24.2437 2.8125 27.1875 5.75625 27.1875 9.375L27.1875 20.625C27.1875 24.2437 24.2437 27.1875 20.625 27.1875L9.375 27.1875C5.75625 27.1875 2.8125 24.2437 2.8125 20.625L2.8125 9.375C2.8125 5.75625 5.75625 2.8125 9.375 2.8125L20.625 2.8125Z"
//                                                     fill="black"
//                                                 />
//                                                 <path
//                                                     d="M7.5 15C7.5 19.1419 10.8581 22.5 15 22.5C19.1419 22.5 22.5 19.1419 22.5 15C22.5 10.8581 19.1419 7.5 15 7.5C10.8581 7.5 7.5 10.8581 7.5 15ZM19.6875 15C19.6875 17.5837 17.5837 19.6875 15 19.6875C12.4144 19.6875 10.3125 17.5838 10.3125 15C10.3125 12.4163 12.4144 10.3125 15 10.3125C17.5837 10.3125 19.6875 12.4162 19.6875 15Z"
//                                                     fill="black"
//                                                 />
//                                                 <path
//                                                     d="M7.93685 6.93715C7.93685 6.38521 7.48942 5.93777 6.93748 5.93777C6.38554 5.93777 5.93811 6.38521 5.93811 6.93715C5.93811 7.48909 6.38554 7.93652 6.93748 7.93652C7.48942 7.93652 7.93685 7.48909 7.93685 6.93715Z"
//                                                     fill="black"
//                                                 />
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 </div>

//                                 <Formik
//                                     initialValues={{
//                                         name: '',
//                                         email: '',
//                                         text: ''
//                                     }}
//                                     validationSchema={Yup.object({
//                                         name: Yup.string()
//                                             .min(2, 'At least 2 characters')
//                                             .required('Required'),
//                                         email: Yup.string()
//                                             .email('Incorrect email format')
//                                             .required('Required'),
//                                         text: Yup.string()
//                                             .min(10, 'At least 10 characters')
//                                     })}
//                                     onSubmit={values => console.log(JSON.stringify(values, null, 2))}
//                                 >
//                                     <Form className="form">
//                                         <h2>Inquiry form</h2>
//                                         <MyTextInput
//                                             label="Your name"
//                                             id="name"
//                                             name="name"
//                                             type="text"
//                                             autoComplete="off"
//                                             placeholder="name"
//                                         />
//                                         <MyTextInput
//                                             label="Your email"
//                                             id="email"
//                                             name="email"
//                                             type="email"
//                                             autoComplete="off"
//                                             placeholder="email"
//                                         />
//                                         <ErrorMessage component="div" className="error" name="currency" />
//                                         <label htmlFor="text">Your message</label>
//                                         <Field
//                                             id="text"
//                                             name="text"
//                                             as="textarea"
//                                             placeholder="message"
//                                         />
//                                         <ErrorMessage component="div" className="error" name="text" />
//                                         <button type="submit">Send</button>
//                                     </Form>
//                                 </Formik>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Contacts;