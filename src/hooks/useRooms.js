import { useState, useEffect } from 'react';

export function useRooms() {
  const [discoveredRooms] = useState([
    {
      id: "5678901234",
      name: "عشاق التكنولوجيا",
      category: "tech",
      members: 234,
      description: "نقاشات حول أحدث التقنيات والابتكارات",
      tags: ["تقنية", "برمجة", "ذكاء_اصطناعي"],
      isActive: true
    },
    {
      id: "6789012345",
      name: "مجتمع الفنانين",
      category: "art",
      members: 156,
      description: "مساحة إبداعية للفنانين لمشاركة أعمالهم",
      tags: ["فن", "رسم", "تصميم"],
      isActive: true
    },
    {
      id: "7890123456",
      name: "غرفة الألعاب",
      category: "gaming",
      members: 489,
      description: "مناقشة أحدث الألعاب والبطولات",
      tags: ["العاب", "بلايستيشن", "اكس_بوكس"],
      isActive: true
    }
  ]);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'gaming', label: 'ألعاب' },
    { id: 'tech', label: 'تقنية' },
    { id: 'art', label: 'فن وإبداع' },
    { id: 'social', label: 'اجتماعي' }
  ];

  return {
    discoveredRooms,
    categories
  };
}