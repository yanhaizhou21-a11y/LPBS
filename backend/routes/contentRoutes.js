import { Router } from 'express';
import { getDB } from '../config/db.js';
import { DEFAULT_TESTIMONIALS, DEFAULT_FAQS, DEFAULT_GALLERY } from '../data/defaultContent.js';

const router = Router();

router.get('/testimonials', async (_req, res) => {
  try {
    const testimonials = await getDB().collection('testimonials').find({}).toArray();
    return res.json({ success: true, testimonials: testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS });
  } catch (error) {
    return res.json({ success: true, testimonials: DEFAULT_TESTIMONIALS });
  }
});

router.get('/faq', async (_req, res) => {
  try {
    const faq = await getDB().collection('faq').find({}).toArray();
    return res.json({ success: true, faq: faq.length > 0 ? faq : DEFAULT_FAQS });
  } catch (error) {
    return res.json({ success: true, faq: DEFAULT_FAQS });
  }
});

router.get('/gallery', async (_req, res) => {
  try {
    const gallery = await getDB().collection('gallery').find({}).toArray();
    return res.json({ success: true, gallery: gallery.length > 0 ? gallery : DEFAULT_GALLERY });
  } catch (error) {
    return res.json({ success: true, gallery: DEFAULT_GALLERY });
  }
});

export default router;
