<table>
    @foreach($comments as $comment)
    <tr>
        <td>
            {{ $comment->author}}
        </td>
        <td>
            {{ $comment->text}}
        </td>
    </tr>
    @endforeach
</table>

   