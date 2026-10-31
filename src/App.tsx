/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IndividualSystemSection } from './components/IndividualSystemSection';
import { FacultySection } from './components/FacultySection';
import { PostsSection } from './components/PostsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingQuickBar } from './components/FloatingQuickBar';
import { ConsultationBookingModal } from './components/ConsultationBookingModal';
import { PostDetailModal } from './components/PostDetailModal';
import { PhoneCallModal } from './components/PhoneCallModal';
import { AdminCustomizerModal } from './components/AdminCustomizerModal';
import { LegalModal } from './components/LegalModal';
import { NoticePage } from './components/NoticePage';

import {
  Post,
  ThemeSettings,
  SeoSettings,
  ConsultationBooking,
  TargetTrack,
} from './types';
import {
  initialFaculty,
} from './data/mockData';
import {
  loadStoredPosts,
  saveStoredPosts,
  loadStoredTheme,
  saveStoredTheme,
  loadStoredSeo,
  saveStoredSeo,
  loadStoredBookings,
  saveStoredBookings,
} from './utils/storage';

export default function App() {
  // Loaded from storage or initial mocks
  const [theme, setTheme] = useState<ThemeSettings>(loadStoredTheme);
  const [seo, setSeo] = useState<SeoSettings>(loadStoredSeo);
  const [posts, setPosts] = useState<Post[]>(loadStoredPosts);
  const [bookings, setBookings] = useState<ConsultationBooking[]>(loadStoredBookings);

  // Page Routing State ('home' vs dedicated 'notice' page)
  const [currentPage, setCurrentPage] = useState<'home' | 'notice'>('home');
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedBookingTrack, setSelectedBookingTrack] = useState<TargetTrack>('대치동 1:1 개별맞춤 클리닉');
  const [isCallModalOpen, setIsCallModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'theme' | 'posts' | 'bookings' | 'seo'>('theme');
  const [activePostDetail, setActivePostDetail] = useState<Post | null>(null);
  const [editingPostData, setEditingPostData] = useState<Post | null>(null);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalType, setLegalType] = useState<'terms' | 'privacy'>('terms');

  // Handle URL hash routing (#notice, #notice/post-1)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#notice')) {
        const parts = hash.split('/');
        setCurrentPage('notice');
        if (parts[1]) {
          setSelectedNoticeId(parts[1]);
        }
      } else if (hash === '' || hash === '#' || hash === '#home') {
        setCurrentPage('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Dynamic document title & styling sync
  useEffect(() => {
    document.title = seo.metaTitle || theme.academyName;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.metaDescription);
    }

    // Apply primary color variable to root
    document.documentElement.style.setProperty('--primary-orange', theme.primaryColor);
    document.documentElement.style.setProperty('--primary-glow', theme.accentGlow);

    // Apply background tone
    if (theme.bgTone === 'pure-black') {
      document.body.style.backgroundColor = '#07070a';
    } else if (theme.bgTone === 'deep-charcoal') {
      document.body.style.backgroundColor = '#101016';
    } else if (theme.bgTone === 'midnight-navy') {
      document.body.style.backgroundColor = '#0a0e17';
    }
  }, [theme, seo]);

  // Handlers
  const handleUpdateTheme = (newTheme: ThemeSettings) => {
    setTheme(newTheme);
    saveStoredTheme(newTheme);
  };

  const handleUpdateSeo = (newSeo: SeoSettings) => {
    setSeo(newSeo);
    saveStoredSeo(newSeo);
  };

  const handleSavePost = (savedPost: Post) => {
    let updated: Post[];
    const exists = posts.some((p) => p.id === savedPost.id);
    if (exists) {
      updated = posts.map((p) => (p.id === savedPost.id ? savedPost : p));
    } else {
      updated = [savedPost, ...posts];
    }
    setPosts(updated);
    saveStoredPosts(updated);
  };

  const handleDeletePost = (postId: string) => {
    const updated = posts.filter((p) => p.id !== postId);
    setPosts(updated);
    saveStoredPosts(updated);
    if (activePostDetail?.id === postId) {
      setActivePostDetail(null);
    }
  };

  const handleOpenPostDetail = (post: Post) => {
    // Increment view count
    const updated = posts.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p));
    setPosts(updated);
    saveStoredPosts(updated);
    setActivePostDetail({ ...post, views: post.views + 1 });
  };

  const handleSelectTrackForBooking = (track: TargetTrack) => {
    setSelectedBookingTrack(track);
    setIsBookingOpen(true);
  };

  const handleSubmitBooking = (newBooking: ConsultationBooking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    saveStoredBookings(updated);
  };

  const handleUpdateBookingStatus = (
    bookingId: string,
    status: ConsultationBooking['status'],
    adminNote?: string
  ) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return {
          ...b,
          status,
          adminNote: adminNote !== undefined ? adminNote : b.adminNote,
        };
      }
      return b;
    });
    setBookings(updated);
    saveStoredBookings(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07070a] text-zinc-100 selection:bg-[#ff6b00] selection:text-black">
      {/* Navbar */}
      <Navbar
        theme={theme}
        currentPage={currentPage}
        onNavigateToHome={() => {
          setCurrentPage('home');
          setSelectedNoticeId(null);
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToNoticePage={(postId) => {
          setCurrentPage('notice');
          setSelectedNoticeId(postId || null);
          window.location.hash = postId ? `#notice/${postId}` : '#notice';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => {
          setSelectedBookingTrack('대치동 1:1 개별맞춤 클리닉');
          setIsBookingOpen(true);
        }}
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onOpenAdmin={() => {
          setAdminTab('theme');
          setIsAdminOpen(true);
        }}
      />

      {/* Main Content: Either Home Landing OR Dedicated Notice Page */}
      <main className="flex-1">
        {currentPage === 'notice' ? (
          <NoticePage
            posts={posts}
            selectedPostId={selectedNoticeId}
            theme={theme}
            onSelectPost={(postId) => {
              setSelectedNoticeId(postId || null);
              window.location.hash = postId ? `#notice/${postId}` : '#notice';
            }}
            onBackToHome={() => {
              setCurrentPage('home');
              setSelectedNoticeId(null);
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBooking={(track) => {
              if (track) setSelectedBookingTrack(track);
              setIsBookingOpen(true);
            }}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              theme={theme}
              onOpenBooking={() => {
                setSelectedBookingTrack('대치동 1:1 개별맞춤 클리닉');
                setIsBookingOpen(true);
              }}
              onOpenCallModal={() => setIsCallModalOpen(true)}
            />

            {/* 2. 1:1 Individual Coaching System Section */}
            <IndividualSystemSection
              theme={theme}
              onOpenBooking={() => {
                setSelectedBookingTrack('대치동 1:1 개별맞춤 클리닉');
                setIsBookingOpen(true);
              }}
            />

            {/* 3. Elite Faculty */}
            <FacultySection
              faculty={initialFaculty}
              theme={theme}
            />

            {/* 7. Posts & Mathematical Insights CMS */}
            <PostsSection
              posts={posts}
              theme={theme}
              onOpenPostDetail={handleOpenPostDetail}
              onOpenNoticePage={(postId) => {
                setCurrentPage('notice');
                setSelectedNoticeId(postId || null);
                window.location.hash = postId ? `#notice/${postId}` : '#notice';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenNewPostModal={() => {
                setAdminTab('posts');
                setIsAdminOpen(true);
              }}
              onEditPost={(p) => {
                setEditingPostData(p);
                setAdminTab('posts');
                setIsAdminOpen(true);
              }}
              onDeletePost={handleDeletePost}
            />

            {/* 8. Campus Map & Location */}
            <LocationSection
              theme={theme}
              onOpenBooking={() => {
                setSelectedBookingTrack('대치동 1:1 개별맞춤 클리닉');
                setIsBookingOpen(true);
              }}
              onOpenCallModal={() => setIsCallModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        onOpenBooking={() => {
          setSelectedBookingTrack('대치동 1:1 개별맞춤 클리닉');
          setIsBookingOpen(true);
        }}
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onOpenAdmin={() => {
          setAdminTab('theme');
          setIsAdminOpen(true);
        }}
        onOpenLegal={(type) => {
          setLegalType(type);
          setIsLegalOpen(true);
        }}
        onOpenTuitionNotice={() => {
          const tuitionPost = posts.find((p) => p.attachmentImage) || posts[0];
          if (tuitionPost) {
            setCurrentPage('notice');
            setSelectedNoticeId(tuitionPost.id);
            window.location.hash = `#notice/${tuitionPost.id}`;
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Sticky Bottom Floating Bar */}
      <FloatingQuickBar
        theme={theme}
        onOpenBooking={() => {
          setSelectedBookingTrack('대치동 1:1 개별맞춤 클리닉');
          setIsBookingOpen(true);
        }}
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onOpenAdmin={() => {
          setAdminTab('theme');
          setIsAdminOpen(true);
        }}
      />

      {/* MODALS */}
      {/* 1. Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmitBooking={handleSubmitBooking}
        defaultTrack={selectedBookingTrack}
        theme={theme}
      />

      {/* 2. Post Reading Detail Modal */}
      <PostDetailModal
        post={activePostDetail}
        onClose={() => setActivePostDetail(null)}
        onOpenNoticePage={(postId) => {
          setActivePostDetail(null);
          setCurrentPage('notice');
          setSelectedNoticeId(postId);
          window.location.hash = `#notice/${postId}`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => {
          setSelectedBookingTrack('대치동 1:1 개별맞춤 클리닉');
          setIsBookingOpen(true);
        }}
        theme={theme}
      />

      {/* 3. Phone Call Modal (02-573-3133) */}
      <PhoneCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onOpenBooking={() => {
          setIsCallModalOpen(false);
          setIsBookingOpen(true);
        }}
        theme={theme}
      />

      {/* 4. Admin & Live Customizer Modal */}
      <AdminCustomizerModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          setEditingPostData(null);
        }}
        theme={theme}
        seo={seo}
        posts={posts}
        bookings={bookings}
        onUpdateTheme={handleUpdateTheme}
        onUpdateSeo={handleUpdateSeo}
        onSavePost={handleSavePost}
        onDeletePost={handleDeletePost}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        editingPostData={editingPostData}
        initialTab={adminTab}
      />

      {/* 5. Legal Informational Modals (Terms, Privacy) */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        type={legalType}
        theme={theme}
      />
    </div>
  );
}
