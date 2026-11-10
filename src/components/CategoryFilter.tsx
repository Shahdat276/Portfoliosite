"use client";

import React from 'react';
import { StudioTheme, Project } from '@/types';
import { PROJECT_CATEGORIES } from '@/data/siteConfig';

interface CategoryFilterProps {
    theme: StudioTheme;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    projects?: Project[];
}

export function CategoryFilter({
    theme,
    selectedCategory,
    setSelectedCategory,
    projects = []
}: CategoryFilterProps) {
    return (
        <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:pb-4 sm:mb-10 border-b"
            style={{ borderColor: theme.border }}
            role="tablist"
            aria-label="Filter Projects by Category"
        >
            {PROJECT_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                const count =
                    category === 'All'
                        ? projects.length
                        : projects.filter((p) => p.category === category).length;

                return (
                    <button
                        key={category}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCategory(category)}
                        className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 active:scale-95 border cursor-pointer inline-flex items-center gap-1.5"
                        style={{
                            backgroundColor: isActive ? theme.text : theme.surface,
                            borderColor: isActive ? theme.text : theme.border,
                            color: isActive ? theme.bg : theme.textMuted
                        }}
                    >
                        <span>{category}</span>
                        {projects.length > 0 && (
                            <span
                                className="font-mono text-[10px] opacity-75"
                                style={{
                                    color: isActive ? theme.bg : theme.accent
                                }}
                            >
                                ({count})
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
