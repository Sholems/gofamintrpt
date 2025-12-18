'use client';

import React, { useState, useEffect } from 'react';
import { NavigationService } from '../../../lib/navigation-service';
import { NavItemConfig } from '../../../lib/routes';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../lib/utils';

export default function AdminNavigationPage() {
  const [menu, setMenu] = useState<NavItemConfig[]>([]);
  const [editingItem, setEditingItem] = useState<{index: number, childIndex?: number} | null>(null);

  useEffect(() => {
    setMenu(NavigationService.getMenu());
  }, []);

  const handleSave = () => {
    NavigationService.saveMenu(menu);
    alert('Navigation updated successfully!');
  };

  const addItem = () => {
    const newItem: NavItemConfig = { label: 'New Link', href: '/' };
    setMenu([...menu, newItem]);
  };

  const addChild = (parentIndex: number) => {
    const newMenu = [...menu];
    if (!newMenu[parentIndex].children) newMenu[parentIndex].children = [];
    newMenu[parentIndex].children?.push({ label: 'New Sublink', href: '/' });
    setMenu(newMenu);
  };

  const removeItem = (index: number, childIndex?: number) => {
    const newMenu = [...menu];
    if (childIndex !== undefined) {
      newMenu[index].children = newMenu[index].children?.filter((_, i) => i !== childIndex);
    } else {
      newMenu.splice(index, 1);
    }
    setMenu(newMenu);
  };

  const updateItem = (index: number, field: keyof NavItemConfig, value: any, childIndex?: number) => {
    const newMenu = [...menu];
    if (childIndex !== undefined) {
      const child = newMenu[index].children![childIndex];
      (child as any)[field] = value;
    } else {
      (newMenu[index] as any)[field] = value;
    }
    setMenu(newMenu);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <header>
          <h2 className="text-3xl font-black text-brand-primary uppercase tracking-tighter">Menu Architect</h2>
          <p className="text-slate-500 text-sm mt-1">Design and organize the navigation flow for your royal community.</p>
        </header>
        <div className="flex gap-4">
          {/* Fix: use block to call void function and state update, avoiding truthiness check error */}
          <Button variant="outline" onClick={() => { NavigationService.resetToDefault(); setMenu(NavigationService.getMenu()); }} className="rounded-2xl border-slate-200 text-slate-400">Reset Defaults</Button>
          <Button variant="gold" onClick={handleSave} className="rounded-2xl px-10 shadow-xl shadow-brand-gold/20">Save Navigation</Button>
        </div>
      </div>

      <div className="space-y-6">
        {menu.map((item, idx) => (
          <Card key={idx} className="p-0 overflow-hidden border-none shadow-xl rounded-[2rem] bg-white group">
            <div className="p-6 bg-slate-50/50 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <input 
                    value={item.label}
                    onChange={(e) => updateItem(idx, 'label', e.target.value)}
                    className="bg-transparent border-none text-brand-primary font-black uppercase tracking-widest focus:ring-0 w-48"
                  />
                  <input 
                    value={item.href}
                    onChange={(e) => updateItem(idx, 'href', e.target.value)}
                    className="bg-transparent border-none text-[10px] text-slate-400 font-bold focus:ring-0"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => addChild(idx)} className="text-[10px] font-black text-brand-gold uppercase px-4 py-2 hover:bg-white rounded-xl transition-colors">+ Add Child</button>
                <button onClick={() => removeItem(idx)} className="text-[10px] font-black text-red-400 uppercase px-4 py-2 hover:bg-red-50 rounded-xl transition-colors">Delete</button>
              </div>
            </div>

            {item.children && item.children.length > 0 && (
              <div className="p-4 space-y-3 bg-white">
                {item.children.map((child, cIdx) => (
                  <div key={cIdx} className="ml-12 p-4 bg-slate-50 rounded-2xl flex items-center justify-between group/child">
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-brand-gold/30" />
                      <div className="flex flex-col">
                        <input 
                          value={child.label}
                          onChange={(e) => updateItem(idx, 'label', e.target.value, cIdx)}
                          className="bg-transparent border-none text-xs font-bold text-brand-primary focus:ring-0"
                        />
                        <input 
                          value={child.href}
                          onChange={(e) => updateItem(idx, 'href', e.target.value, cIdx)}
                          className="bg-transparent border-none text-[9px] text-slate-400 focus:ring-0"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={child.isComingSoon} 
                          onChange={(e) => updateItem(idx, 'isComingSoon', e.target.checked, cIdx)}
                          className="rounded border-slate-200 text-brand-gold focus:ring-brand-gold"
                        />
                        <span className="text-[9px] font-black uppercase text-slate-400">Soon</span>
                      </label>
                      <button onClick={() => removeItem(idx, cIdx)} className="text-red-300 hover:text-red-500 transition-colors">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
        
        <button 
          onClick={addItem}
          className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black uppercase tracking-[0.3em] hover:border-brand-gold hover:text-brand-gold transition-all"
        >
          + Add Top Level Link
        </button>
      </div>
    </div>
  );
}