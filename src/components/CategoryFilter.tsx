"use client";

import React from 'react';
import { StudioTheme } from '@/types';
import { PROJECT_CATEGORIES } from '@/data/siteConfig';

interface CategoryFilterProps {
    theme: StudioTheme;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
}

export function CategoryFilter({
    theme,
    selectedCategory,
    setSelectedCategory
}: CategoryFilterProps) {
    return (
        <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-12 border-b"
            style={{ borderColor: theme.border }}
            role="tablist"
            aria-label="Filter Projects by Category"
        >
            {PROJECT_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                    <button
                        key={category}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCategory(category)}
                        className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border cursor-pointer"
                        style={{
                            backgroundColor: isActive ? theme.text : theme.surface,
                            borderColor: isActive ? theme.text : theme.border,
                            color: isActive ? theme.bg : theme.textMuted
                        }}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}
