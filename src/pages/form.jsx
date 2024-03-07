import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const ContactForm = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const[phone,setPhone]=useState('');
  const[message,setMessage]=useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data ={
      Name:name,
      Email:email,
      Phone:phone,
      Message:message
    }

    axios.post('https://sheet.best/api/sheets/8cd944c0-755f-4e20-90ed-58875e1c2ce8',data)
      .then((response)=>{
        console.log(response); 
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSubmissionStatus('Form submitted successfully!');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        setSubmissionStatus('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input type="tel" id="phone" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea id="message" name="message" value={message} onChange={(e)=>setMessage(e.target.value)} required rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit">Submit</Button>
              {submissionStatus && <p className="text-green-500">{submissionStatus}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <CardDescription>Submit the form to send your message</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContactForm;
