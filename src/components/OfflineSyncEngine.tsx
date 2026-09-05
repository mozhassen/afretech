import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Database, 
  ShieldCheck, 
  HardDrive, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  ArrowDownUp,
  Cpu,
  Layers
} from 'lucide-react';

export const OfflineSyncEngine: React.FC = () => {
  const { 
    isOnline, 
    toggleNetworkStatus, 
    lastSyncedTimestamp, 
    pendingQueueCount, 
    submissions, 
    syncLogs, 
    runDeltaSync, 
    isSyncing, 
    totalBytesSavedKb,
    t 
  } = useApp();

  const queuedSubmissions = submissions.filter(s => s.syncStatus === 'queued_offline');
  const syncedSubmissions = submissions.filter(s => s.syncStatus !== 'queued_offline');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>FR-5 & NFR-4 Rural Synchronization Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.syncEngineHeader}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {t.syncEngineSub}
            </p>
          </div>

          {/* Sync Trigger Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              id="run-delta-sync-btn"
              onClick={runDeltaSync}
              disabled={isSyncing || !isOnline}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all min-h-[48px] ${
                isSyncing
                  ? 'bg-amber-600 text-white animate-pulse cursor-not-allowed'
                  : !isOnline
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? t.syncInProgress : t.syncNowButton}</span>
            </button>

            <button
              onClick={toggleNetworkStatus}
              className={`w-full sm:w-auto px-4 py-3.5 rounded-2xl font-semibold text-xs border transition-colors flex items-center justify-center gap-2 min-h-[48px] ${
                isOnline
                  ? 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  : 'bg-amber-950 border-amber-600/50 text-amber-300 hover:bg-amber-900'
              }`}
            >
              {isOnline ? <WifiOff className="w-4 h-4 text-amber-400" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
              <span>{isOnline ? t.simulatedOffline : t.simulatedOnline}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sync Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Connection Status */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
            isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {isOnline ? <Wifi className="w-6 h-6" /> : <WifiOff className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
              Network Status
            </span>
            <span className="font-extrabold text-sm sm:text-base text-stone-900">
              {isOnline ? 'Connected (4G/Wi-Fi)' : 'Offline (Local Cache)'}
            </span>
          </div>
        </div>

        {/* Metric 2: Pending Offline Queue */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center text-xl shrink-0">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
              Offline Queue
            </span>
            <span className="font-black text-lg text-amber-900">
              {pendingQueueCount} {pendingQueueCount === 1 ? 'Record' : 'Records'}
            </span>
          </div>
        </div>

        {/* Metric 3: Bandwidth Saved (NFR-4) */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center text-xl shrink-0">
            <ArrowDownUp className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
              Data Conserved
            </span>
            <span className="font-black text-lg text-teal-900">
              {(totalBytesSavedKb / 1024).toFixed(2)} MB
            </span>
          </div>
        </div>

        {/* Metric 4: Last Timestamp */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center text-xl shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
              Last Synced
            </span>
            <span className="font-bold text-xs sm:text-sm text-stone-900">
              {lastSyncedTimestamp}
            </span>
          </div>
        </div>
      </div>

      {/* Local Queue Details */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              Local Offline Storage & Queue (FR-5.1)
            </h3>
          </div>
          <span className="text-xs bg-stone-100 text-stone-700 font-semibold px-2.5 py-1 rounded-full">
            Encrypted SQLite / LocalStorage Cache
          </span>
        </div>

        {queuedSubmissions.length > 0 ? (
          <div className="space-y-3">
            {queuedSubmissions.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{item.plantName}</span>
                    <span className="bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      Queued Offline
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs">
                    Recorded by <strong>{item.practitionerName}</strong> • {item.state}, {item.country}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-stone-500 font-mono text-[11px]">{item.timestamp}</span>
                  <button
                    onClick={runDeltaSync}
                    disabled={!isOnline}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                  >
                    Sync This
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              All local contributions are currently up to date with consortium cloud servers.
            </span>
          </div>
        )}
      </div>

      {/* Delta Sync Activity History (FR-5.2) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.syncLogTitle}
            </h3>
          </div>
          <span className="text-xs text-stone-500">
            {syncLogs.length} Sync Session(s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase font-semibold">
                <th className="pb-3 pr-4">Timestamp</th>
                <th className="pb-3 px-4">Event Description</th>
                <th className="pb-3 px-4">Records</th>
                <th className="pb-3 px-4">Payload Size</th>
                <th className="pb-3 pl-4">Optimization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {syncLogs.map(log => (
                <tr key={log.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 pr-4 font-mono text-stone-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-medium text-stone-900">
                    {log.description}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-800">
                    {log.recordsCount}
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-600">
                    {log.payloadSizeKb} KB
                  </td>
                  <td className="py-3 pl-4">
                    <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-bold text-[10px]">
                      {log.compressedRatio}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Architecture Notes from SRS Section 5 */}
      <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-xs text-stone-600 space-y-2">
        <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-emerald-700" />
          <span>Afretec Consortium Architecture Specifications</span>
        </h4>
        <p className="leading-relaxed">
          • <strong>Local Database:</strong> SQLite (SQLCipher encryption) caching the entire botanical repository for instantaneous offline lookups in rural regions.
        </p>
        <p className="leading-relaxed">
          • <strong>Delta Synchronization:</strong> Sends only modified records and compressed media (photo &le;300 KB, Opus voice notes) over TLS 1.3 to conserve rural bandwidth.
        </p>
        <p className="leading-relaxed">
          • <strong>Primary Storage & Backend:</strong> PostGIS enabled PostgreSQL for geospatial habitat indexing + S3-compatible cloud object storage.
        </p>
      </div>
    </div>
  );
};
