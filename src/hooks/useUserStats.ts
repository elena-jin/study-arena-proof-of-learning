import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface UserStats {
    points: number;
    streak: number;
    loading: boolean;
    error: string | null;
}

export const useUserStats = (): UserStats => {
    const [stats, setStats] = useState<Omit<UserStats, 'loading' | 'error'>>({
        points: 0,
        streak: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchStats = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('profiles')
                    .select('points, streak')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (isMounted && data) {
                    setStats({
                        points: data.points,
                        streak: data.streak,
                    });
                }
            } catch (err: any) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchStats();

        // Subscribe to real-time changes
        const subscription = supabase
            .channel('profile_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                },
                (payload) => {
                    if (isMounted) {
                        setStats({
                            points: payload.new.points,
                            streak: payload.new.streak,
                        });
                    }
                }
            )
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(subscription);
        };
    }, []);

    return { ...stats, loading, error };
};
