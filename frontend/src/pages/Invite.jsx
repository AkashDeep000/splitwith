import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Invite from "@/components/Invite";
import { useParams } from "react-router-dom";

const queryClient = new QueryClient();

function InvitePage() {
  const { groupId } = useParams();
  return (
    <QueryClientProvider client={queryClient}>
      <Invite groupId={groupId} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  ); 
}

export default InvitePage;
