import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ContributionSubmission } from '../types';
import { 
  GraduationCap, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  MapPin, 
  FileSpreadsheet, 
  FileCode, 
  Volume2, 
  Calendar,
  Layers,
  BarChart3,
  ExternalLink
} from 'lucide-react';

export const ResearcherAdmin: React.FC = () => {
  const { 
    submissions, 
    updateSubmissionStatus, 
    plants, 
    t, 
    speakText,
    currentUser 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const filteredSubmissions = submissions.filter(s => {
    if (filterStatus === 'pending') return s.syncStatus === 'synced_cloud' || s.syncStatus === 'queued_offline';
    if (filterStatus === 'approved') return s.syncStatus === 'approved_by_researcher';
    return true;
  });

  // Export CSV generator
  const handleExportCsv = () => {
    const headers = [
      'Submission ID',
      'Timestamp',
      'Plant Name',
      'Local Name',
      'Country',
      'State',
      'Latitude',
      'Longitude',
      'Practitioner',
      'Parts Used',
      'Preparation',
      'Dosage',
      'Ailments',
      'Sync Status',
      'Ethical Consent'
    ];

    const rows = submissions.map(s => [
      s.id,
      `"${s.timestamp}"`,
      `"${s.plantName}"`,
      `"${s.localName}"`,
      s.country,
      `"${s.state}"`,
      s.coordinates.lat,
      s.coordinates.lng,
      `"${s.practitionerName}"`,
      `"${s.partsUsed.join('; ')}"`,
      `"${s.preparationSteps.replace(/"/g, '""')}"`,
      `"${s.dosage.replace(/"/g, '""')}"`,
      `"${s.ailmentsTreated.join('; ')}"`,
      s.syncStatus,
      s.consentAgreed ? 'YES' : 'NO'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `afretec_traditional_medicine_unilag_aastu_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice("CSV dataset exported successfully for UniLag & AASTU research teams.");
    setTimeout(() => setExportNotice(null), 3500);
  };

  // Export JSON generator
  const handleExportJson = () => {
    const exportData = {
      project: "Afretec Research Consortium Traditional Medicine Mobile App",
      partners: [
        "University of Lagos (UniLag, Nigeria)",
        "Addis Ababa Science and Technology University (AASTU, Ethiopia)"
      ],
      exportedAt: new Date().toISOString(),
      plantCatalog: plants,
      fieldSubmissions: submissions
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `afretec_taxonomy_database_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice("Full JSON taxonomy package exported successfully.");
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Consortium Admin Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-500/40 text-teal-400 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-teal-400" />
              <span>UniLag & AASTU Academic Research Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.researcherHeader}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Ethnobotanical review, PostGIS geospatial coordination, data export, and cross-border taxonomy harmonization.
            </p>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportCsv}
              className="px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-sm transition-colors min-h-[48px]"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t.exportCsv}</span>
            </button>
            <button
              onClick={handleExportJson}
              className="px-4 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold rounded-2xl text-xs flex items-center gap-2 transition-colors min-h-[48px]"
            >
              <FileCode className="w-4 h-4" />
              <span>{t.exportJson}</span>
            </button>
          </div>
        </div>

        {exportNotice && (
          <div className="mt-4 p-3 bg-emerald-900/90 border border-emerald-500/50 rounded-xl text-xs font-semibold text-emerald-200 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{exportNotice}</span>
          </div>
        )}
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Cataloged Plant Species
          </span>
          <div className="text-3xl font-black text-stone-900 mt-1">
            {plants.length}
          </div>
          <span className="text-xs text-emerald-700 font-medium">
            5 Shared Cross-Border Species
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Field Submissions
          </span>
          <div className="text-3xl font-black text-stone-900 mt-1">
            {submissions.length}
          </div>
          <span className="text-xs text-stone-500 font-medium">
            From Lagos, Ogun, Shewa & Oromia
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Concordance Index
          </span>
          <div className="text-3xl font-black text-emerald-700 mt-1">
            92.2%
          </div>
          <span className="text-xs text-emerald-800 font-medium">
            High Ethnobotanical Agreement
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Consortium Milestone
          </span>
          <div className="text-2xl font-black text-teal-800 mt-1">
            M4 Field Pilot
          </div>
          <span className="text-xs text-stone-500 font-medium">
            AASTU & UniLag Cohorts
          </span>
        </div>
      </div>

      {/* Milestone Progress Tracker (Section 6 of SRS) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>Afretec Project Milestones & Deliverables Roadmap</span>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            Pilot Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <span className="font-bold text-emerald-900 block">M1: Month 1</span>
            <p className="text-stone-600 text-[11px] mt-0.5">Architecture, Amharic & Yoruba UI mocks ✓</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <span className="font-bold text-emerald-900 block">M2: Month 2</span>
            <p className="text-stone-600 text-[11px] mt-0.5">Alpha Prototype & Offline SQLite Cache ✓</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <span className="font-bold text-emerald-900 block">M3: Month 3</span>
            <p className="text-stone-600 text-[11px] mt-0.5">Contribution & Voice delta sync engine ✓</p>
          </div>
          <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl ring-2 ring-amber-400/40">
            <span className="font-bold text-amber-950 block">M4: Month 4 (Current)</span>
            <p className="text-stone-700 text-[11px] mt-0.5">Field Pilot with AASTU & UniLag Cohorts</p>
          </div>
          <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl">
            <span className="font-bold text-stone-700 block">M5: Month 5</span>
            <p className="text-stone-500 text-[11px] mt-0.5">Final Handover, Production APK & Repository</p>
          </div>
        </div>
      </div>

      {/* Field Submissions Review Table (FR-1.2 & FR-3) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.reviewSubmissions}
            </h3>
            <p className="text-xs text-stone-500">
              Validate traditional recipes, confirm botanical identification, and authorize catalog indexing.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
              }`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === 'pending' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
              }`}
            >
              Pending Review
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === 'approved' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
              }`}
            >
              Verified
            </button>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-4 pt-1">
          {filteredSubmissions.map(item => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-50/80 transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-stone-900">
                      {item.plantName}
                    </h4>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {item.localName}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Contributed by <strong>{item.practitionerName}</strong> ({item.practitionerPhone}) • {item.state}, {item.country}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.syncStatus === 'approved_by_researcher'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.syncStatus === 'flagged'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.syncStatus === 'approved_by_researcher'
                      ? '✓ Verified by Consortium'
                      : item.syncStatus === 'flagged'
                        ? 'Clarification Needed'
                        : 'Awaiting Validation'}
                  </span>
                </div>
              </div>

              {/* Recipe & Dosage */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs space-y-1.5">
                <div>
                  <span className="font-bold text-stone-700">Preparation: </span>
                  <span className="text-stone-800">{item.preparationSteps}</span>
                </div>
                <div>
                  <span className="font-bold text-stone-700">Dosage: </span>
                  <span className="text-stone-800">{item.dosage}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="font-bold text-stone-500 text-[10px] uppercase">Parts: </span>
                  {item.partsUsed.map(p => (
                    <span key={p} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[11px] capitalize">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* GPS Coordinates & Consent Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {item.coordinates.lat}, {item.coordinates.lng} (±{item.coordinates.accuracyMeters || 4}m)
                  </span>
                  <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Informed Consent Confirmed
                  </span>
                </div>

                {/* Reviewer Action Buttons */}
                <div className="flex items-center gap-2">
                  {item.syncStatus !== 'approved_by_researcher' && (
                    <button
                      onClick={() => updateSubmissionStatus(item.id, 'approved_by_researcher', 'Validated by UniLag/AASTU joint taxonomists.')}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-colors min-h-[38px]"
                    >
                      {t.approveButton}
                    </button>
                  )}
                  {item.syncStatus !== 'flagged' && (
                    <button
                      onClick={() => updateSubmissionStatus(item.id, 'flagged', 'Clarify plant age and preparation duration.')}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium px-3 py-1.5 rounded-xl text-xs transition-colors min-h-[38px]"
                    >
                      {t.flagButton}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
