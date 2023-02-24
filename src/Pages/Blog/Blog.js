import React from 'react';

const Blog = () => {
    return (
        <div>
            <h2 className='my-4 text-3xl text-primary font-bold'>Blog page</h2>
            <div className='my-4'>
                <h4 className='text-2xl text-font1 font-bold'>What are the different ways to manage a state in a React application?</h4>
                <p className='text-xl text-font2'>Local state. Global state. Server state. URL state.</p>
            </div>
            <div className='my-4'>
                <h4 className='text-2xl text-font1 font-bold'>How does prototypical inheritance work?</h4>
                <p className='text-xl text-font2'>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
            </div>
            <div className='my-4'>
                <h4 className='text-2xl text-font1 font-bold'>What is a unit test? Why should we write unit tests?</h4>
                <p className='text-xl text-font2'>Unit Testing is a testing method that tests an individual unit of software in isolation. Unit testing for React Apps means testing an individual React Component. Unit Testing is important for React Apps, as it helps in testing the individual functionality of React components.</p>
            </div>
            <div className='my-4'>
                <h4 className='text-2xl text-font1 font-bold'>React vs. Angular vs. Vue?</h4>
                <p className='text-xl text-font2'>React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework.</p>
            </div>
        </div>
    );
};

export default Blog;