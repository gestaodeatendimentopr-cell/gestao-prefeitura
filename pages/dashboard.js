// pages/dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { AuthContext } from './_app';
import { getAtendimentos } from '@/lib/supabase';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPontos: 0,
    totalAtendimentos: 0,
    pendentes: 0,
    emExecucao: 0,
    concluidos: 0,
    modernizados: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      try {
        // Aqui você carregaria dados reais do Supabase
        // Por enquanto, usando dados de exemplo
        setStats({
          totalPontos: 1240,
          totalAtendimentos: 456,
          pendentes: 23,
          emExecucao: 15,
          concluidos: 418,
          modernizados: 340,
        });
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Gestão de Iluminação Pública</title>
      </Head>

      <Layout>
        <div>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
            <p className="text-slate-600">Visão geral de atendimentos e operação</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Pontos */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Total de Pontos</p>
                  <p className="text-4xl font-bold text-slate-900">
                    {loading ? '—' : stats.totalPontos}
                  </p>
                </div>
                <div className="text-4xl">📍</div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600">Base do Censo</p>
              </div>
            </div>

            {/* Total Atendimentos */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Total Atendimentos</p>
                  <p className="text-4xl font-bold text-slate-900">
                    {loading ? '—' : stats.totalAtendimentos}
                  </p>
                </div>
                <div className="text-4xl">📞</div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600">Registrados</p>
              </div>
            </div>

            {/* Pendentes */}
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Pendentes</p>
                  <p className="text-4xl font-bold text-yellow-600">
                    {loading ? '—' : stats.pendentes}
                  </p>
                </div>
                <div className="text-4xl">⏳</div>
              </div>
              <div className="mt-4 pt-4 border-t border-yellow-200">
                <p className="text-xs text-yellow-600">Aguardando ação</p>
              </div>
            </div>

            {/* Em Execução */}
            <div className="card bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Em Execução</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {loading ? '—' : stats.emExecucao}
                  </p>
                </div>
                <div className="text-4xl">🔧</div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-600">Sendo executados</p>
              </div>
            </div>

            {/* Concluídos */}
            <div className="card bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Concluídos</p>
                  <p className="text-4xl font-bold text-green-600">
                    {loading ? '—' : stats.concluidos}
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-xs text-green-600">Resolvidos</p>
              </div>
            </card>

            {/* Modernizados */}
            <div className="card bg-purple-50 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Modernizados</p>
                  <p className="text-4xl font-bold text-purple-600">
                    {loading ? '—' : stats.modernizados}
                  </p>
                </div>
                <div className="text-4xl">⚡</div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <p className="text-xs text-purple-600">
                  {Math.round((stats.modernizados / stats.totalPontos) * 100)}% do parque
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="card-header">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-center">
                <div className="text-2xl mb-2">➕</div>
                <p className="text-sm font-medium text-slate-900">Novo Atendimento</p>
              </button>
              <button className="p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-center">
                <div className="text-2xl mb-2">📤</div>
                <p className="text-sm font-medium text-slate-900">Upload Census</p>
              </button>
              <button className="p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-center">
                <div className="text-2xl mb-2">📊</div>
                <p className="text-sm font-medium text-slate-900">Ver Relatórios</p>
              </button>
              <button className="p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-center">
                <div className="text-2xl mb-2">🗺️</div>
                <p className="text-sm font-medium text-slate-900">Visualizar Mapa</p>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
