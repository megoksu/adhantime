export function getTimeUntil(targetTime: Date, timezone?: string): string {
    // Create current time in the target timezone
    const now = timezone 
        ? new Date(new Date().toLocaleString('en-US', { timeZone: timezone }))
        : new Date();
    
    console.log('=== Time Calculation Debug ===');
    console.log('Current time:', now.toLocaleString());
    console.log('Target time:', targetTime.toLocaleString());
    
    let diff = targetTime.getTime() - now.getTime();
    
    // If diff is negative, it means the target time has already passed today
    if (diff < 0) {
        // Only add a day if we're calculating for the next occurrence
        // and the target time is for today
        const targetHours = targetTime.getHours();
        const currentHours = now.getHours();
        
        // If current time is after target time on the same day
        if (currentHours > targetHours || 
            (currentHours === targetHours && now.getMinutes() > targetTime.getMinutes())) {
            targetTime.setDate(targetTime.getDate() + 1);
            diff = targetTime.getTime() - now.getTime();
        }
    }
    
    // Calculate hours and minutes
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    console.log('Calculated hours:', hours);
    console.log('Calculated minutes:', minutes);
    console.log('========================');
    
    // Format the output
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}