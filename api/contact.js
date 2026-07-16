// /api/contact.js
// Vercel serverless function — receives the contact form POST,
// validates it, and inserts the message into Supabase using the
// service role key (kept server-side only, never sent to the browser).

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are all required.' });
    }
    if (name.length > 100 || email.length > 150 || message.length > 2000) {
      return res.status(400).json({ error: 'One of the fields is too long.' });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const { error } = await supabase.from('messages').insert([
      {
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      }
    ]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return res.status(500).json({ error: 'Could not save your message. Please try again.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
